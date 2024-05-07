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



}
