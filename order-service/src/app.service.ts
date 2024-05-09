/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { User } from './interfaces/user';
import { decode } from 'jsonwebtoken';

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

}
