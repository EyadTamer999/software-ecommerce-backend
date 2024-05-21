/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';
//import { Model } from 'mongoose';
//import { User } from './interfaces/user';
import { ClientKafka } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { InvalidToken } from './exceptions/Invalidtoken';
import { decode } from 'jsonwebtoken';
import { NotVerified } from './exceptions/NotVerified';




@Injectable()
export class AppService {
   
  
  constructor( @Inject('USER_SERVICE') private userClient: ClientKafka ,  private readonly mailerService: MailerService ,
   private jwtService: JwtService) {
    this.userClient.subscribeToResponseOf('create_user');
    this.userClient.subscribeToResponseOf('user_findByEmail');
    this.userClient.subscribeToResponseOf('GetUser-Email-link-token');
    this.userClient.subscribeToResponseOf('update-user');
  }


  private async getUserByToken(jwtToken: string) {
    const paylod = decode(jwtToken);
    // console.log('Payload:', paylod['user']);
    const email = paylod['email'];
    const data = await this.userClient.send('user_findByEmail' , email).toPromise();
    const user = data.user
    
    return user;
    
  }

  private async sendMail(email: string, link: string , subject :string , body:string , html : string ): Promise<any> {
    
    return   this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: subject,
      text: body,
      html: html,
    }).then(() => {
      console.log('Email sent');
    })
    .catch((e) => {
      console.log('Error sending email', e);
    });

   
  }


  async verifyRegister(user: CreateUserDTO): Promise<any> {
    try {
      const verificationToken = randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(user.password, 10);


      //update user CreateUserDTO
      user.password = hashedPassword;
      user.Verification = false;
      user.VerificationCode = verificationToken;

      //send user to user-service
      const newUser = await this.userClient.send('create_user', user).toPromise();
      if(newUser.message === 'User already exists'){
        return { success: false, message: 'User already exists' };
      }

       const link = `http://${process.env.BASE_URL}/auth-gateway/verify-email?token=${newUser.user.VerificationCode}`; 
      
       const info = await this.sendMail(newUser.user.email, link ,'User Registration Verification' , 'Welcome to our platform! Please click the link below to verify your email address.'
       ,`<p>Welcome to our platform!</p><p>Please click the link below to verify your email address:</p><a href="${link}">Verify Email</a>`);

      const returnUser ={
        id : newUser.user._id,
        email: newUser.user.email,
        firstname: newUser.user.FirstName,
        lastname: newUser.user.LastName,
        phone: newUser.user.phone,
        company: newUser.user.company,
        address: newUser.user.address,
        Verification: newUser.user.Verification,
      }

      return { success: true, message: 'Email has been sent' , returnUser}; //, data: returnUser
 
    } catch (error) {
      throw error;
    }
  
    console.log('Verification email sent successfully');
  
  }



  async verifyEmail(token: string): Promise<any> {
    console.log('Verifying email:', token);
    const user =await  this.userClient.send('GetUser-Email-link-token', token).toPromise()     //await this.userModel.findOne({ VerificationCode: token });
    console.log("user when link send:", user)
    if (user.message === 'Invalid verification token') {
      return { success: false, message: 'Invalid verification token' };
    }
    return { success: true, message: 'Email verified successfully'};
  }



  async resendEmail(email: string): Promise<any> {
    console.log('Resending email:', email);
    const data =  await this.userClient.send('user_findByEmail' , email).toPromise();    //await this.userModel.findOne({ email : email });
    // console.log("user when resend....:", data) 
    const user = data.user;
    if (data.message === "No such email exists!") {
      return { success: false, message: 'Email not Found' };
    }
    if (user.Verification) {
      return { success: false, message: 'User already verified' };
    }
    if (!user.VerificationCode) {
      user.VerificationCode = randomBytes(32).toString('hex');
      const updateuser = await this.userClient.send('update-user' , user).toPromise();
    }
    
    const link = `http://${process.env.BASE_URL}/auth-gateway/verify-email?token=${user.VerificationCode}`;
    await this.sendMail(user.email, link , 'User Registration Verification' , 'Welcome to our platform! Please click the link below to verify your email address.' , `<p>Welcome to our platform!</p><p>Please click the link below to verify your email address:</p><a href="${link}">Verify Email</a>`);
    return { success: true, message: 'Email has been resent' };
  }

  async loginUser(loginDTO: LoginUserDTO): Promise<{ access_token: string }> {
    const data = await this.userClient.send('user_findByEmail', loginDTO.email).toPromise();
    const user = data.user;
    // console.log("user:", user);
    if(user.verification === false){
      throw new NotVerified();
    }

    if (user && (await bcrypt.compare(loginDTO.password, user.password))) {
      const payload = { email : user.email , user: user._id , role: user.role};
      // console.log("payload from login: ", payload , "user:", user._id)
      return { access_token : await this.jwtService.signAsync(payload)}
    } else {
      throw new InvalidToken();
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


  async updatePassword(jwtToken: string, oldpassword: string, newpassword: string): Promise<any> {

    // console.log("jwtToken:", jwtToken, "oldpassword:", oldpassword, "newpassword:", newpassword)

    const user = await this.getUserByToken(jwtToken);

    console.log("user:", user)

    if (user.message === 'No such email exists!') {
      return { success: false, message: 'User not found' };
    }
    if (!user.Verification) {
      return { success: false, message: 'User not verified' };
    }
    
    if (!await bcrypt.compare(oldpassword, user.password)) {
      return { success: false, message: 'Invalid password' };
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await this.userClient.send('update-user', user).toPromise();

    return { success: true, message: 'Password updated successfully' };
  }

  

  async forgotPassword(email: string): Promise<any> {
    const data = await this.userClient.send('user_findByEmail', email).toPromise();
    const user = data.user;
    if (user.message === 'No such email exists!') {
      return { success: false, message: 'User not found' };
    }
    if(!user.Verification){
      return { success: false, message: 'User not verified' };
    }
    const resetToken = randomBytes(32).toString('hex');

    user.VerificationCode = resetToken;
    await this.userClient.send('update-user', user).toPromise();
    //path bta3 html file(Front) mafrod hab3tlo token wel mail
    const link = `http://${process.env.BASE_URL}/auth-gateway/reset-password?token=${resetToken}&email=${email}`;

    await this.sendMail(user.email, link, 'Password Reset', 'You have requested a password reset. Please click the link below to reset your password.', `<p>You have requested a password reset.</p><p>Please click the link below to reset your password:</p><a href="${link}">Reset Password</a>`);



    
    return { success: true, message: 'an email with a password reset link' };
  }

  async resetPassword(token: string, email: string, newPassword: string): Promise<any> {
    const data = await this.userClient.send('user_findByEmail' , email).toPromise();
    const user = data.user
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    if(user.VerificationCode !== token){
      return { success: false, message: 'Invalid verification token' };
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.VerificationCode = null;
    await this.userClient.send('update-user', user).toPromise();
    return { success: true, message: 'Password reset successfully' };
  }

}
