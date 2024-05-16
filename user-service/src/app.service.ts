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
import { promises } from 'dns';


@Injectable()
export class AppService {
  
  constructor(@Inject('USER_MODEL') private userModel: Model<User> ,
   private jwtService: JwtService) {
    
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
  async findByEmail(email: string): Promise<any> {
    console.log('email from service:', email);
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return { success: false, message: 'No such email exists!' };
    }
    return { success: true,  user };
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
  

  async createUser(data: CreateUserDTO): Promise<any> {
    console.log('Creating user:', data);
    const user = await this.userModel.findOne({
      email: data.email,
    });
    if (user) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = new this.userModel({
      ...data,
    });
    await newUser.save();

    return { success: true, message: 'User created successfully' , user:newUser};

  }

  async getUserEmailLinkToken(token :string): Promise<any> {
    console.log('Getting user email link token:', token);
    const user = await this.userModel.findOne({ VerificationCode: token });
    if (!user) {
      return { success: false, message: 'Invalid verification token' };
    }

    user.VerificationCode = null;
    user.Verification = true;
    await user.save();
    return { success: true, message: 'Email verified successfully' };
  }


  // updating user not for profile used for kafkaClinets
  async updateUser(data: CreateUserDTO): Promise<any> {
    console.log('Updating user:', data);
  
    // Construct the update object dynamically
    const updateFields = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== undefined) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
  
    // Check if updateFields is empty
    if (Object.keys(updateFields).length === 0) {
      return { success: false, message: 'No fields to update' };
    }
  
    // Find and update the user
    const user = await this.userModel.findOneAndUpdate(
      { email: data.email },
      { $set: updateFields },
      { new: true, upsert: false }
    );
  
    if (!user) {
      return { success: false, message: 'No such user exists!' };
    }
  
    return { success: true, message: 'User updated successfully', code: user.VerificationCode };
  }


  async getAllAdmins(): Promise<any>{

    const Admins = await this.userModel.find({role: 'admin'});
    if(Admins.length === 0){
      return {message: "No admins Found"};
    }

    return { Admins };

  }
  
}
