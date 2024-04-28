/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';

@Controller('Users')
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  @Post('register')
  async registerUser(@Body() user: CreateUserDto): Promise<any> {
    return this.userGatewayService.registerUser(user);
  }
}
