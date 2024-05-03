/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';
import {User} from './interfaces/user';
import { CreateUserDTO } from './DTO/createUser.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './DTO/loginUser.dto';



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
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.identityModel({
      ...user,
      password: hashedPassword, // Replace the plain password with hashed password
      VerificationCode: verificationToken
  });
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
  
  async findByEmail(data: LoginUserDTO): Promise<any> {
    console.log("email from service:", data.email)
    const user = await this.identityModel.findOne({ email: data.email });
    if (!user) {
      return { success: false, message: 'No such email exists!' };
    }
    return { success: true, data: user};
  }
}
