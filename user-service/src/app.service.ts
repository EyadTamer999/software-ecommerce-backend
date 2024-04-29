/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';
import {User} from './interfaces/user';
import { CreateUserDTO } from './DTO/createUser.dto';
import { randomBytes } from 'crypto';


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
    
    const verificationToken = randomBytes(32).toString('hex');


    const newUser = new this.identityModel(user);
    newUser.VerificationCode = verificationToken;
    await newUser.save();

    return { success: true, message: 'User registered successfully' , data: user , code: newUser.VerificationCode};
  } 


  async verifyEmail(token: string): Promise<any> {
    console.log('Verifying email:', token);
    const user = await this.identityModel.findOne({ VerificationCode: token });
    if (!user) {
      return { success: false, message: 'Invalid verification token' };
    }
    user.VerificationCode = null;
    user.Verification = true;
    await user.save();
    return { success: true, message: 'Email verified successfully'};
  }
}
