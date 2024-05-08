/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException ,UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';
import {User} from './interfaces/user';
import { CreateUserDTO } from './DTO/createUser.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import { LoginUserDTO } from './DTO/loginUser.dto';


@Injectable()
export class AppService {
  
  constructor(@Inject('USER_MODEL') private userModel: Model<User> , @Inject('AUTH_SERVICE') private kafkaClient: ClientKafka,
   private jwtService: JwtService) {
    //this.kafkaClient.subscribeToResponseOf('user_register');
  }
  getHello(): string {
    return 'Hello World!';
  }
  
  
  async updateProfile(data: any): Promise<any> {
    console.log('Updating profile:', data);
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      return { success: false, message: 'No such user exists!' };
    }
    if (data.firstName){
      user.FirstName = data.firstName;
    }
    if (data.lastName){
      user.LastName = data.lastName;
    }
    if (data.phone){
      user.phone = data.phone;
    }
    if (data.address){
      user.address = data.address;
    }


    await user.save();
    return { success: true, message: 'Profile updated successfully' };
  }
  // async validateToken(accessToken: string): Promise<any> {
  //   console.log('Access token from hahahahahaha:', accessToken);
  //   const token = await this.jwtService.verifyAsync(accessToken);
  //   if (!token){
  //     return new UnauthorizedException();
  //   }
  //   // check for the user details in the payload using the findByEmail
  //   return { token: token}
  // }
  async findByEmail(data: LoginUserDTO): Promise<any> {
    console.log('email from service:', data.email);
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      return { success: false, message: 'No such email exists!' };
    }
    return { success: true, data: user };
  }


  //view address function
  async viewAddress(email: string): Promise<any> {
    console.log("email: appservice", email);
    const user = await this.userModel.findOne({email: email});
    console.log("user address:", user.address);
    return { success: true, data: user.address };
  }
  
    
 
}
