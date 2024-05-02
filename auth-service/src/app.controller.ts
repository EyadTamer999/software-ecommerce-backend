/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



  @MessagePattern('verify_user_register')
  async registerUser(user: CreateUserDTO): Promise<any> {
    
    console.log('ana wslt ll auth-service: ' , user);
    return this.appService.verifyRegister(user);
  }

  @MessagePattern('login_user')
  async login(user: LoginUserDTO): Promise<any> {
    return this.appService.loginUser(user);
  }
}
