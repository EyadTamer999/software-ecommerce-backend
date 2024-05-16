/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';

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
}
