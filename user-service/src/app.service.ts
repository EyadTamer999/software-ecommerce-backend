/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';
import {User} from './interfaces/user';
import { CreateUserDTO } from './DTO/createUser.dto';


@Injectable()
export class AppService {
  //private identityModel: Model<User>
  //private readonly kafkaClient: ClientKafka
  constructor(@Inject('USER_MODEL') private identityModel: Model<User>) {
    //this.kafkaClient.subscribeToResponseOf('user_register');
  }
  getHello(): string {
    return 'Hello World!';
  }


  async register(user: CreateUserDTO): Promise<any> {
    console.log('Registering user final:', user);
    
    const newUser = new this.identityModel(user);
    await newUser.save();

    return { success: true, message: 'User registered successfully' , data: user};
  } 
}
