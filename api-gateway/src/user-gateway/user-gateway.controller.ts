/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';

import { UpdateUserDTO } from './DTO/updateUser.dto';

import { query } from 'express';


@Controller('Users')
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}



  @Put('update-profile')
  async updateProfile(@Body() user: UpdateUserDTO, @Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');
    return this.userGatewayService.updateProfile(user , jwtToken);  
  }

  @Get("view-address")
  viewAddress(@Query('email') email: string): Promise<any> {
    console.log("email:", email);
    return this.userGatewayService.viewAddress(email);
  }


}
