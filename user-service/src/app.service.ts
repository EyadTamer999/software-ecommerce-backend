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

    await user.save();
    return { success: true, message: 'Profile updated successfully' };
  }
  //de lama n3oz user meen service tanya 
  async findByEmail(email: string): Promise<any> {
    console.log('email from service:', email);
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return { success: false, message: 'No such email exists!' };
    }
    return { success: true,  user };
  }
  async viewProfile(jwtToken : string): Promise<any> {
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return { success: false, message: 'No such user exists!' };
    }
    const returnUser = {
      email: user.email,
      firstName: user.FirstName,
      lastName: user.LastName,
      phone: user.phone,
      company: user.company,
      role: user.role,
      // address: user.address,
      // cards: user.cards,
    };
    return { success: true, data: returnUser };
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
  async addAddress( label: string, appartment: string, floor:string, street:string, building:string, postalcode:string, city:string, country:string, state:string, extra_description:string ,jwtToken: string): Promise<any> {
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    console.log("appservice "
    ,"label:", label
    ,"appartment:", appartment
    ,"floor:", floor
    ,"street:", street
    ,"building:", building
    ,"postalcode:", postalcode
    ,"city:", city
    ,"country:", country
    ,"state:", state
    ,"extra_description:", extra_description
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

    user.address.push({ label: label, appartment: appartment, floor: floor, street: street, building: building, postalcode: postalcode, city: city, country: country, state: state, extra_description: extra_description});
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

  //add cards function
  async addCard( name: string, cardnumber: string, expiration: string, cvv: string , jwtToken: string): Promise<any> {
    console.log("jwtToken : appservice", jwtToken );
    const email = this.getUserByToken(jwtToken);
    console.log('Email from token:', email);

    console.log("appservice "
    ,"name:", name
    ,"cardnumber:", cardnumber
    ,"expiration:", expiration
    ,"cvv:", cvv
    );
    const user = await this.userModel.findOne({email: email});

    if (!user) {
      return { success: false, message: "User not found" };
    }
    //func to not add same label twice
    const cardExists = user.cards.find((card) => card.cardnumber === cardnumber);
    if (cardExists) {
      return { success: false, message: "Card already exists" };
    }

    const hashedcvv = await bcrypt.hash(cvv, 10);
    
    //const encryptedCardNumber = await bcrypt.(cardnumber, hashedcvv);

    user.cards.push({ name: name, cardnumber: cardnumber, expiration: expiration, cvv: hashedcvv});
    await user.save();
    return { success: true, data: user.cards };
  }



  async getAllusers(): Promise<any>{
    const users = await this.userModel.find({role: 'user'});
    if(users.length === 0){
      return {message: "No users Found"};
    }

    return { users };
  }

  


//delete card function
async deleteCard( id: string, jwtToken: string): Promise<any> {
  console.log("appservice  ", "cvv el fe kafka service :", id)
  console.log("jwtToken : appservice", jwtToken );
  const email = this.getUserByToken(jwtToken);
  console.log('Email from token:', email);
  

  try {
      // Find the user by email
      const user = await this.userModel.findOne({ email: email }).exec();
      if (!user) {
         return { success: false, message: "User not found" };
       }

      console.log("id:", id);
      user.cards = user.cards.filter((card) => String(card['_id']) !== id);
      console.log("card : ", user.cards);

      await this.updateUser(user);
      return { success: true, data: user.cards };

  } catch (error) {
      console.error("Error deleting card:", error);
      return { success: false, message: "Error deleting card" };
  } 

}
}