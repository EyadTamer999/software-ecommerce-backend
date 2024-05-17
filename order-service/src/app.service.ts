/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { decode } from 'jsonwebtoken';
import { Cron , CronExpression } from '@nestjs/schedule';
import { ClientKafka } from '@nestjs/microservices';
import { ISettings } from './interfaces/settings.interface';

 
@Injectable()
export class AppService {
 constructor(@Inject('USER_SERVICE') private userClient: ClientKafka , @Inject('ORDER_MODEL') private orderModel: Model<Order> , 
  @Inject('SETTINGS_MODEL') private settingsModel:Model<ISettings>) {
  this.userClient.subscribeToResponseOf('user_findByEmail');
  this.userClient.subscribeToResponseOf('update-user');
  this.userClient.subscribeToResponseOf('Get-all-Admins');

 }

 private async getUserByToken(jwtToken: string) {
  const paylod = decode(jwtToken);
  // console.log('Payload:', paylod['user']);
  const email = paylod['email'];
  const data = await this.userClient.send('user_findByEmail' , email).toPromise();
  const user = data.user
  
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

    // console.log('User from create order: ', user);

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
    console.log('User from get orders history: ', user._id);
    const orders = await this.orderModel.find({ 
      user: user._id, 
      orderStatus: { $in: ['closed', 'cancelled'] }
    });
    
    console.log("------------->" ,orders)
    if(orders.length === 0 ){
      return {message : 'No order History'}
    }
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
    if (!order) {
      return { message: 'Order not found' };
    }
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

    //if now is two days after the order date i will not allow the user to cancel the order
    const orderDate = order.createdAt;
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays > 2){
      return { message: 'You can not cancel the order now 2 days passed' };
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
    if(order.orderStatus !== 'pending'){
      return { message: ' it Should be pending first' };
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
     await this.userClient.send('update-user' , admin).toPromise();                          
    


    return { message: 'Order status closed successfully', order };
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM) // You can change this to your desired cron expression
  private async updateQueue() {
    try {
      // Get all admin users
      const data = await this.userClient.send('Get-all-Admins', {}).toPromise();
      const admins = data.Admins;
      
      if (admins.length === 0) {
        console.log('No admins found');
        return;
      }
  
      // Retrieve the last assigned admin index from the settings
      const lastAssignedSetting = await this.settingsModel.findOne({ name: 'lastAssignedAdminIndex' });
  
      // Initialize the last assigned admin index if not already present
      let lastAssignedAdminIndex = lastAssignedSetting ? lastAssignedSetting.value : 0;
  
      // Get the current date
      const currentDate = new Date();
  
      // Find all orders with status 'open'
      const orders = await this.orderModel.find({ orderStatus: 'open' });
  
      // Filter orders that need to be added
      const ordersToAdd = orders.filter(order => {
        const orderDate = new Date(order.createdAt); // Ensure orderDate is a Date object
        const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < 2; // Check if order is younger than 2 days
      });
  
      if (ordersToAdd.length === 0) {
        console.log('No new orders to add to the queue');
        return;
      }
  
      // Gather all currently assigned order IDs to avoid duplicate assignments
      const assignedOrderIds = new Set<string>();
      admins.forEach(admin => {
        admin.ordersQueue.forEach(orderId => assignedOrderIds.add(String(orderId)));
      });
  
      // Round-robin distribution of orders
      for (const order of ordersToAdd) {
        let assigned = false;
        let attempts = 0; // Track the number of attempts to avoid infinite loops
  
        // Check if the order is already assigned
        const orderIdString = String(order._id);
        if (assignedOrderIds.has(orderIdString)) {
          continue; // Skip this order if it's already assigned
        }
  
        // Loop through admins to find the next admin who does not have the order
        while (!assigned && attempts < admins.length) {
          const admin = admins[lastAssignedAdminIndex];
  
          // Convert admin.ordersQueue elements to strings for comparison
          const orderQueueIds = admin.ordersQueue.map(id => String(id));
  
          if (!orderQueueIds.includes(orderIdString)) {
            admin.ordersQueue.push(order._id);
            await this.userClient.send('update-user', admin).toPromise(); //admin.save();
            assigned = true;
            assignedOrderIds.add(orderIdString); // Mark the order as assigned
          }
  
          // Move to the next admin in a round-robin fashion
          lastAssignedAdminIndex = (lastAssignedAdminIndex + 1) % admins.length;
          attempts++; // Increment the number of attempts
        }
  
        if (!assigned) {
          console.log(`Order ${order._id} could not be assigned to any admin`);
        }
      }
  
      // Save the updated last assigned admin index to the settings
      await this.settingsModel.updateOne(
        { name: 'lastAssignedAdminIndex' },
        { $set: { value: lastAssignedAdminIndex } },
        { upsert: true }
      );
  
      console.log('Cron job completed....');
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }

}
