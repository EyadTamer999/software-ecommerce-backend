/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query,Delete } from '@nestjs/common';
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
