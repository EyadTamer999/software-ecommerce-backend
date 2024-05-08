/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';
import { query } from 'express';

@Controller('Users')
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  @Get("view-address")
  viewAddress(@Query('email') email: string): Promise<any> {
    console.log("email:", email);
    return this.userGatewayService.viewAddress(email);
  }

}
