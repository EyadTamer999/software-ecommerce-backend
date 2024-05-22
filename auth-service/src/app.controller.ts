/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { Controller, Get, UseInterceptors ,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
=======
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
>>>>>>> e4cc43b3 (Initial)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @MessagePattern('verify_user_register')
  async registerUser(user: CreateUserDTO): Promise<any> {
    
    console.log('ana wslt ll auth-service: ' , user);
    return this.appService.verifyRegister(user);
  }



  @MessagePattern('verify_email')
  async verifyEmail(data: { token: string }): Promise<any> {
    console.log('Received email verification request:', data);
    return this.appService.verifyEmail(data.token);
  }


  @MessagePattern('resend_email')
  async resendEmail( email: string ): Promise<any> {
    console.log('Received resend email request:', email);
    return this.appService.resendEmail(email); 
  }


  @MessagePattern('login_user')
  async login(user: LoginUserDTO): Promise<any> {
    return this.appService.loginUser(user);
  }
<<<<<<< HEAD


  @MessagePattern('update_password')
  @UseInterceptors(KafkaInterceptor)
  async updatePassword(@Payload() payload: {jwtToken: string, data : { oldpassword: string, newpassword: string}} ): Promise<any> {
    const oldpassword = payload.data.oldpassword; 
    const newpassword = payload.data.newpassword;
    const jwtToken = payload.jwtToken;
    console.log('Received update password request:', "oldpassword:",oldpassword,"newpassword:", newpassword);
    return this.appService.updatePassword(jwtToken, oldpassword, newpassword);
  }

  //send email with link to rest password 
  @MessagePattern('forgot_password')
  async forgotPassword(email: string): Promise<any> {
    console.log('Received forgot password request:', email);
    const Email = email['email'];
    console.log('Email:', Email)
    return this.appService.forgotPassword(Email);
  }
  //used in html page to reset password 
  @MessagePattern('reset_password')
  async resetPassword(data: { token: string, email :string ,newPassword: string }): Promise<any> {
    const { token, email, newPassword } = data;
    console.log('Received reset password request:', data);
    return this.appService.resetPassword(token, email ,newPassword);
  }
=======
>>>>>>> e4cc43b3 (Initial)
}
