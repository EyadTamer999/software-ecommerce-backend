/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';
//import { Model } from 'mongoose';
//import { User } from './interfaces/user';
import { ClientKafka } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { User } from './interfaces/user'
import * as bcrypt from 'bcrypt';




@Injectable()
export class AppService {
  
  constructor( @Inject('USER_SERVICE') private userClient: ClientKafka ,  private readonly mailerService: MailerService ,@Inject('USER_MODEL') private userModel: Model<User>) {
    this.userClient.subscribeToResponseOf('user_register');
  }

  private async sendMail(email: string, link: string): Promise<any> {
    return   this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'User Registration Verification',
      text: 'Welcome to our platform! Please click the link below to verify your email address.',
      html: `<p>Welcome to our platform!</p><p>Please click the link below to verify your email address:</p><a href="${link}">Verify Email</a>`,
    }).then(() => {
      console.log('Email sent');
    })
    .catch((e) => {
      console.log('Error sending email', e);
    });

   
  }


  async verifyRegister(user: CreateUserDTO): Promise<any> {
    console.log('verifyRegister user:', user);
    //check is user already exists
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
  
    try {
      const verificationToken = randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new this.userModel({
        ...user,
        password: hashedPassword,
        Verification: false, 
        VerificationCode: verificationToken
    });
      await newUser.save();

  
      const link = `http://${process.env.BASE_URL}/auth-gateway/verify-email?token=${newUser.VerificationCode}`; 
      
      const info = await this.sendMail(newUser.email, link);

      const returnUser ={
        id : newUser._id,
        email: newUser.email,
        firstname: newUser.FirstName,
        lastname: newUser.LastName,
        phone: newUser.phone,
        company: newUser.company,
        address: newUser.address,
        Verification: newUser.Verification,
      }

      return { success: true, message: 'Email has been sent', data: returnUser };
 
    } catch (error) {
      throw error;
    }
  
    console.log('Verification email sent successfully');
  
  }



  async verifyEmail(token: string): Promise<any> {
    console.log('Verifying email:', token);
    const user = await this.userModel.findOne({ VerificationCode: token });
    if (!user) {
      return { success: false, message: 'Invalid verification token' };
    }
    user.VerificationCode = null;
    user.Verification = true;
    await user.save();
    return { success: true, message: 'Email verified successfully'};
  }



  async resendEmail(email: string): Promise<any> {
    console.log('Resending email:', email);
    const user = await this.userModel.findOne({ email : email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    if (user.Verification) {
      return { success: false, message: 'User already verified' };
    }
    if (!user.VerificationCode) {
      user.VerificationCode = randomBytes(32).toString('hex');
    }
    await user.save();
    const link = `http://${process.env.BASE_URL}/auth-gateway/verify-email?token=${user.VerificationCode}`;
    await this.sendMail(user.email, link);
    return { success: true, message: 'Email has been resent' };
  }
}
