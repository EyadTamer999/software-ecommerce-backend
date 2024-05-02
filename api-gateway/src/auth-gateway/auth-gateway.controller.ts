/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';
import { LoginUserDTO } from './DTO/Login-User.dto';

@Controller('auth-gateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('verify')
  async registerUser(@Body() user: CreateUserDto): Promise<any> {
    return this.authGatewayService.verifyRegisterUser(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDTO) : Promise<any> {
    return this.authGatewayService.loginUser(user)
  }


}
