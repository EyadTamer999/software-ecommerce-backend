/* eslint-disable prettier/prettier */

<<<<<<< HEAD
import { Body, Controller, Get, Post, Put, Param, Req,Delete } from '@nestjs/common';
=======
import { Body, Controller, Get, Post, Put, Query, Req,Delete } from '@nestjs/common';
>>>>>>> e4cc43b3 (Initial)

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
<<<<<<< HEAD
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
=======
    return this.userGatewayService.updateProfile(user , jwtToken);  
  }

  @Get("view-address")
  viewAddress(@Query('email') email: string): Promise<any> {
    console.log("email:", email);
    return this.userGatewayService.viewAddress(email);
>>>>>>> e4cc43b3 (Initial)
  }


  @Post('add-address')
<<<<<<< HEAD
  addAddress(@Body() data: {label: string, appartment: string, floor:string, street:string, building:string, postalcode:string, city:string, country:string, state:string, extra_description:string },@Req() request: any): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');

    if (data) {
      console.log(
        "label:", data.label,
        "appartment:", data.appartment,
        "floor:", data.floor,
        "street:", data.street,
        "building:", data.building,
        "postalcode:", data.postalcode,
        "city:", data.city,
        "country:", data.country,
        "state:", data.state,
        "extra_description:", data.extra_description,
        "gateway controller"
=======
  addAddress(@Body() data: {email: string, label: string, address: string}): Promise<any> {
    if (data) {
      console.log("email:", data.email,
        "label:", data.label,
        "address:", data.address,"controller"
>>>>>>> e4cc43b3 (Initial)
      );
    } else {
      console.log('Data is undefined');
    }
<<<<<<< HEAD
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
=======
    return this.userGatewayService.addAddress(data);
  }

  @Delete('delete-address')
  deleteAddress(@Body() data: {email: string, id: string}): Promise<any> {
    if (data) {
      console.log("email:", data.email,
        "id:", data.id,
        "controller"
>>>>>>> e4cc43b3 (Initial)
      );
    } else {
      console.log('Data is undefined');
    }
<<<<<<< HEAD
    return this.userGatewayService.addCard(data, jwtToken);
  }

  @Delete('delete-card/:id')
  deleteCard(@Param('id') id : string , @Req() request): Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');

    console.log("cvv ana fel api-gateway controller :", id); 

    if(id){
      // console.log(
      //   "cvv:", cvv,
      //   "controller")

    } else {
      console.log('Data is undefined');
    }
    // console.log("cvv:", cvv);
    return this.userGatewayService.deleteCard(id, jwtToken);
  }
=======
    return this.userGatewayService.deleteAddress(data);
  }


>>>>>>> e4cc43b3 (Initial)
}
