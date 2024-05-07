/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';

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
}
