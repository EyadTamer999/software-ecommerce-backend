/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';
//import { Model } from 'mongoose';
//import { User } from './interfaces/user';
import { ClientKafka } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';



@Injectable()
export class AppService {
  
  constructor( @Inject('USER_SERVICE') private userClient: ClientKafka ,  private readonly mailerService: MailerService) {
    this.userClient.subscribeToResponseOf('user_register');
  }
  getHello(): string {
    return 'Hello World!';
  }


  async verifyRegister(user: CreateUserDTO): Promise<any> {
    console.log('Registering user final:', user);
  
    const res = await this.userClient.send('user_register', user).toPromise();
    if (!res.success) {
      return { success: false, message: 'Failed to register', data: user };
    }
  
    const link = `${process.env.BASE_URL}/Users/verify-email?token=${res.code}`;
    console.log('Verification link:', link); // Add this line to log the value of link
    try {
      await this.mailerService.sendMail({
        to: res.data.email,
        from: 'oldfathers990@gmail.com',
        subject: 'User Registration Verification',
        text: 'Welcome to our platform! Please click the link below to verify your email address.',
        html: `<p>Welcome to our platform!</p><p>Please click the link below to verify your email address:</p><a href="${link}">Verify Email</a>`,
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { success: false, message: 'Failed to send verification email', data: user };
    }
  
    console.log('Verification email sent successfully');
  
    return { success: true, message: 'Email has been sent', data: res.data };
  }
}
