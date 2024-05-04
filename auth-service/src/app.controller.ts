/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { JWTAuthGuard } from 'guards/jwt-auth.guard';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { LocalAuthGuard } from 'guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('verify_user_register')
  async registerUser(user: CreateUserDTO): Promise<any> {
    console.log('ana wslt ll auth-service: ', user);
    return this.appService.verifyRegister(user);
  }

  @UseGuards(LocalAuthGuard)
  @MessagePattern('login_user')
  async login(user: LoginUserDTO): Promise<any> {
    return this.appService.loginUser(user);
  }
}
