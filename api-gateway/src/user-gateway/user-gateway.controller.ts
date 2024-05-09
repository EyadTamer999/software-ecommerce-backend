/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, Put, Query, Req,Delete } from '@nestjs/common';

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


  @Post('add-address')
  addAddress(@Body() data: {email: string, label: string, address: string}): Promise<any> {
    if (data) {
      console.log("email:", data.email,
        "label:", data.label,
        "address:", data.address,"controller"
      );
    } else {
      console.log('Data is undefined');
    }
    return this.userGatewayService.addAddress(data);
  }

  @Delete('delete-address')
  deleteAddress(@Body() data: {email: string, id: string}): Promise<any> {
    if (data) {
      console.log("email:", data.email,
        "id:", data.id,
        "controller"
      );
    } else {
      console.log('Data is undefined');
    }
    return this.userGatewayService.deleteAddress(data);
  }


}
