/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';
import { LoginUserDTO } from './DTO/logindto.dto';

@Controller('auth-gateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('verify')
  async registerUser(@Body() user: CreateUserDto): Promise<any> {
    return this.authGatewayService.verifyRegisterUser(user);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<any> {
   return this.authGatewayService.verifyEmail(token);
 }

 @Get('resend-email')
  async resendEmail(@Query('email') email: string): Promise<any> {
    return this.authGatewayService.resendEmail(email);
  }
  @Post('login')
  async login(@Body() user: LoginUserDTO) : Promise<any> {
    return this.authGatewayService.loginUser(user)
  }

}
