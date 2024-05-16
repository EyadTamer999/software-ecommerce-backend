/* eslint-disable prettier/prettier */
import { Controller, Get, UseInterceptors ,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { KafkaInterceptor } from './guards/kafka-Interceptor';

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


  @MessagePattern('update_password')
  @UseInterceptors(KafkaInterceptor)
  async updatePassword(@Payload() payload: {jwtToken: string, data : { oldpassword: string, newpassword: string}} ): Promise<any> {
    const oldpassword = payload.data.oldpassword; 
    const newpassword = payload.data.newpassword;
    const jwtToken = payload.jwtToken;
    console.log('Received update password request:', "oldpassword:",oldpassword,"newpassword:", newpassword);
    return this.appService.updatePassword(jwtToken, oldpassword, newpassword);
  }
}
