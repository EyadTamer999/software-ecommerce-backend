/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';


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
}
