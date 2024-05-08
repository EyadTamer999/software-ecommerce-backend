/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';
//import { Model } from 'mongoose';
//import { User } from './interfaces/user';
import { ClientKafka } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { User } from './interfaces/user'
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AppService {
  
  
  constructor( @Inject('USER_SERVICE') private userClient: ClientKafka ,  private readonly mailerService: MailerService ,
  @Inject('USER_MODEL') private userModel: Model<User> , private jwtService: JwtService) {
    this.userClient.subscribeToResponseOf('user_register');
    this.userClient.subscribeToResponseOf('user_findByEmail');
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

  async loginUser(loginDTO: LoginUserDTO): Promise<{ access_token: string }> {
    const user =  await this.userModel.findOne({email : loginDTO.email}); //await this.userClient.send('user_findByEmail', loginDTO).toPromise();
    // console.log("user:", user);
    if (user && (await bcrypt.compare(loginDTO.password, user.password))) {
      const payload = { email : user.email};
      console.log("payload:", payload)
      return { access_token : await this.jwtService.signAsync(payload)}
    } else {
      throw new UnauthorizedException();
    }
  }


  async validateToken(accessToken: string): Promise<any> {
    const token = await this.jwtService.verifyAsync(accessToken);
    if (!token){
      return new UnauthorizedException();
    }
    // check for the user details in the payload using the findByEmail
    return { token: token}
  }

  
}
