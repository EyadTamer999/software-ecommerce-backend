/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { User } from './interfaces/user';
import { decode } from 'jsonwebtoken';
import { Cron , CronExpression } from '@nestjs/schedule';


@Injectable()
export class AppService {
 constructor(@Inject('ORDER_MODEL') private orderModel: Model<Order> , 
 @Inject('USER_MODEL') private userModel:Model<User>) {}

 private async getUserByToken(jwtToken: string) {
  const paylod = decode(jwtToken);
  // console.log('Payload:', paylod['user']);
  const email = paylod['email'];
  const user = await this.userModel.findOne({email: email});

  
  return user;
  
}

  async createOrder(order: any ,jwtToken: string): Promise<any> {
    console.log('Order created: ', order);
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }

    console.log('User from create order: ', user);

    // i will check on product quantity here  
    // check what user choosed to rent or to buy 
    // calculate the total price of the order + tax + delivery fees
    //calculate the delivery fees based on the address( region )
    //call the payment service to make the payment
    // b3d el payment i will update the product quantity in database

    const Order = {
      ...order,
      user: user._id,
    }

    const newOrder = new this.orderModel(Order);
    
    await newOrder.save();
    return { message: 'Order created successfully', order: newOrder };

  
  }

  async getOrdersHistory(jwtToken: string): Promise<any> { 
    // console.log('jwtToken from get orders history:', jwtToken);
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    // console.log('User from get orders history: ', user);
    const orders = await this.orderModel.find({ user: user._id , orderStatus: 'closed' || 'cancelled'});
    return { message: 'Orders retrieved successfully', orders };
  }

  async getOrder( id: string , jwtToken: string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    // console.log('User from get order: ', user);

    const order = await this.orderModel.findOne({ _id: id , user: user._id});
    return { message: 'Order retrieved successfully', order };
  }

  async cancelOrder(id: string , jwtToken: string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    // console.log('User from cancel order: ', user);

    const order = await this.orderModel.findOne({ _id: id , user: user._id});
    if (!order) {
      return { message: 'Order not found' };
    }

    if(order.orderStatus === 'closed' || order.orderStatus === 'cancelled'){
      return { message: 'Order already closed' };
    }

    //if now is three days after the order date i will not allow the user to cancel the order
    const orderDate = order.createdAt;
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays > 3){
      return { message: 'You can not cancel the order now 3 days passed' };
    }


    order.orderStatus = 'cancelled';
    order.deliveryStatus = 'cancelled';
    await order.save();
    return { message: 'Order cancelled successfully', order };
  }


  //admin-----------------------
  async getOrderQueue(jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from get order queue: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to get the order queue' };
    }

    //get the orders from the order model that are in the queue
    const orders = await this.orderModel.find({ _id: admin.ordersQueue});

    
    return { message: 'Order queue retrieved successfully', orders};
  }

  async getAllOrders(jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from get all orders: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to get all orders' };
    }

    const orders = await this.orderModel.find();
    return { message: 'Orders retrieved successfully', orders };
  }

  async updateOrderStatus(id: string , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from update order status: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to update the order status' };
    }

    
    

    const order = await this.orderModel.findOne({ _id: id});
    if (!order) {
      return { message: 'Order not found' };
    }
    
    if(order.orderStatus === 'closed' || order.orderStatus === 'cancelled'){
      return { message: 'Order already closed' };
    }
    if(!admin.ordersQueue.includes(id)){
      return { message: 'You are not authorized to update the order status waite for the system to update your queue' };
    }

    
    order.orderStatus = 'pending';
    order.deliveryStatus = 'pending';
    await order.save();



    return { message: 'Order status updated successfully', order };
  }

  async updateOrderStatusClosed(id: string , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from update order status closed: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to update the order status' };
    }

    const order = await this.orderModel.findOne({ _id: id});
    if (!order) {
      return { message: 'Order not found' };
    }
    
    
    if(order.orderStatus === 'closed' || order.orderStatus === 'cancelled'){
      return { message: 'Order already closed' };
    }

    if(!admin.ordersQueue.includes(id)){
      return { message: 'You are not authorized to update the order status waite for the system to update your queue' };
    }

    order.orderStatus = 'closed';
    order.deliveryStatus = 'delivered';
    await order.save();

    //remove the order from the queue
    const index = admin.ordersQueue.indexOf(id);
    if (index > -1) {
      admin.ordersQueue.splice(index, 1);
    }
    await admin.save();

    return { message: 'Order status closed successfully', order };
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)//EVERY_DAY_AT_6AM
  private async updateQueue(){
    //get all users with admin role
    //get all orders with status open and created at 2 days ago
    const admin = await this.userModel.findOne({role: 'admin'});
    // console.log('Admin:', admin);

    const currentDate = new Date();
    const orders = await this.orderModel.find({orderStatus: 'open'});

    orders.forEach(async order => {
       const orderDate = order.createdAt;
       const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       if(diffDays > 2){
        // console.log('Order:', order);
        if(!admin.ordersQueue.includes(order._id)){
          admin.ordersQueue.push(order._id);
          await admin.save();

        }

       }
    });

    console.log('Cron job started');
  }

}
