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
  console.log('Payload:', paylod['user']);
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
    console.log('User from create order: ', user);

    // i will check on product quantity here  
    // check what user choosed to rent or to buy 
    // calculate the total price of the order + tax + delivery fees
    //calculate the delivery fees based on the address( region )

    const Order = {
      ...order,
      user: user._id,
    }

    const newOrder = new this.orderModel(Order);
    
    await newOrder.save();
    return { message: 'Order created successfully', order: newOrder };

  
  }

}
