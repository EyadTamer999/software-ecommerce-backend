/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';
import {User} from './interfaces/user';
import { CreateUserDTO } from './DTO/createUser.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AppService {
  
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {
    //this.kafkaClient.subscribeToResponseOf('user_register');
  }
  getHello(): string {
    return 'Hello World!';
  }

  //view address function
  async viewAddress(email: string): Promise<any> {
    console.log("email: appservice", email);
    const user = await this.userModel.findOne({email: email});
    console.log("user address:", user.address);
    return { success: true, data: user.address };
  }
  //add address function
  async addAddress(email: string, label: string, address: string): Promise<any> {

    console.log("appservice email: ", email
    ,"label:", label
    ,"address:", address, "service"
    );
    const user = await this.userModel.findOne({email: email});
    user.address.push({ label: label, address: address});
    await user.save();
    return { success: true, data: user.address };
  }
    
  //delete address function
  async deleteAddress(email: string, id: string): Promise<any> {
    console.log("appservice email: ", email, "id:", id, "service");

    try {
        // Find the user by email
        const user = await this.userModel.findOne({ email: email });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Filter out the address with the matching label
        user.address = user.address.filter((address) => address.label !== id);

        // Save the updated user document
        await user.save();

        return { success: true, data: user.address };
    } catch (error) {
        console.error("Error deleting address:", error);
        return { success: false, message: "Error deleting address" };
    }
}
  

 
}
