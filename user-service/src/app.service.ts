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
import { decode } from 'jsonwebtoken';


@Injectable()
export class AppService {
  
  constructor(@Inject('USER_MODEL') private userModel: Model<User> , @Inject('AUTH_SERVICE') private kafkaClient: ClientKafka,
   private jwtService: JwtService) {
    //this.kafkaClient.subscribeToResponseOf('user_register');
  }
  getHello(): string {
    return 'Hello World!';
  }
  
  private getUserByToken(jwtToken: string) {

    const user = decode(jwtToken);
    // console.log('User from token:', user['email']);
    const email = user['email'];
    return email;
  }
  
  async updateProfile(data: any , jwtToken : string): Promise<any> {
    // console.log('Updating profile:', data);

    const email = this.getUserByToken(jwtToken);
    // console.log('Email from token:', email);

    const user = await this.userModel.findOne({ email: email }); 
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

  //view profile function
  async viewProfile(jwtToken : string): Promise<any> {
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return { success: false, message: 'No such user exists!' };
    }
    return { success: true, data: user };
  }

  //view address function
  async viewAddress(jwtToken: string): Promise<any> {
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return { success: false, message: 'No such user exists!' };
    }
    return { success: true, data: user.address };
  }
  //add address function
  async addAddress( label: string, address: string , jwtToken: string): Promise<any> {
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    console.log("appservice "
    ,"label:", label
    ,"address:", address, "service"
    );
    const user = await this.userModel.findOne({email: email});

    if (!user) {
      return { success: false, message: "User not found" };
    }
    //func to not add same label twice
    const labelExists = user.address.find((address) => address.label === label);
    if (labelExists) {
      return { success: false, message: "Label already exists" };
    }

    user.address.push({ label: label, address: address});
    await user.save();
    return { success: true, data: user.address };
  }
    
  //delete address function
  async deleteAddress( id: string, jwtToken: string): Promise<any> {
    console.log("appservice  ", "id:", id)
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    try {
        // Find the user by email
        const user = await this.userModel.findOne({ email: email });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Filter out the address with the matching label
        user.address = user.address.filter((address) => address.label !== id);

        console.log("user.address:", user.address);
        // Save the updated user document
        await user.save();

        return { success: true, data: user.address };
    } catch (error) {
        console.error("Error deleting address:", error);
        return { success: false, message: "Error deleting address" };
    }
}
  

 
}
