/* eslint-disable @typescript-eslint/no-unused-vars */
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
  UseInterceptors
} from '@nestjs/common';
// import { JWTAuthGuard } from 'guards/jwt-auth.guard';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { PublicInterceptor } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @MessagePattern('login_user')
  async login(user: LoginUserDTO): Promise<any> {
    return this.appService.loginUser(user);
  }

  @MessagePattern('validate_token')
  async validateToken(data: { token: string }): Promise<any>{
    return this.appService.validateToken(data.token);
  }
}
