/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { UpdateUserDTO } from './DTO/updateUser.dto';

 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @MessagePattern('user_register')
  async registerUser(user: CreateUserDTO): Promise<any> {
    
    console.log('Received user registration request:', user);
    return this.appService.register(user);
  }

  @MessagePattern('verify_email')
  async verifyEmail(data: { token: string }): Promise<any> {
    console.log('Received email verification request:', data);
    return this.appService.verifyEmail(data.token);
  }
  
  @MessagePattern('user_findByEmail')
  async findByEmail(data: LoginUserDTO): Promise<any> {
    console.log("from controller login:", data.email)
    return this.appService.findByEmail(data);
  }

  @MessagePattern('update_profile')
  async updateProfile(data: UpdateUserDTO): Promise<any> {
    console.log('Received update profile request:', data);
    return this.appService.updateProfile(data);
  }
}
