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
  @Get('view-profile')
  viewProfile(@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');
    console.log("jwtToken from user gateway controller :", jwtToken);
    return this.userGatewayService.viewProfile(jwtToken);
  }

  @Get("view-address")
  viewAddress(@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');
    // console.log("email:", email);
    return this.userGatewayService.viewAddress(jwtToken);
  }


  @Post('add-address')
  addAddress(@Body() data: {email: string, label: string, address: string},@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');

    if (data) {
      console.log("email:", data.email,
        "label:", data.label,
        "address:", data.address,"controller"
      );
    } else {
      console.log('Data is undefined');
    }
    return this.userGatewayService.addAddress(data, jwtToken);
  }

  @Delete('delete-address')
  deleteAddress(@Body() id: string ,@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');

    if(id){
      console.log(
        "id:", id,
        "controller")

    } else {
      console.log('Data is undefined');
    }
    return this.userGatewayService.deleteAddress(id, jwtToken);
  }

  @Post('add-card')
  addCard(@Body() data: {name: string, cardnumber: string, expiration: string, cvv: string,cards: string},@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');

    if (data) {
      console.log(
        "add card",
        "name:", data.name,
        "cardnumber:", data.cardnumber,
        "expiration:", data.expiration,
        "cvv:", data.cvv,
        "data:",data.cards,"controller"
      );
    } else {
      console.log('Data is undefined');
    }
    return this.userGatewayService.addCard(data, jwtToken);
  }

  @Delete('delete-card')
  deleteCard(@Body() cvv: string ,@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');

    console.log("cvv ana fel api-gateway controller :", cvv);

    if(cvv){
      // console.log(
      //   "cvv:", cvv,
      //   "controller")

    } else {
      console.log('Data is undefined');
    }
    // console.log("cvv:", cvv);
    return this.userGatewayService.deleteCard(cvv, jwtToken);
  }
}
