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
  
    
 
}
