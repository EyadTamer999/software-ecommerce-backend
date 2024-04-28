/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';

@Controller('auth-gateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('verify')
  async registerUser(@Body() user: CreateUserDto): Promise<any> {
    return this.authGatewayService.verifyRegisterUser(user);
  }


}
