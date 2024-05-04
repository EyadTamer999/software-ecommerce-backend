/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Controller('Users')
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  //@Post('register')
  //async registerUser(@Body() user: CreateUserDto): Promise<any> {
    //return this.userGatewayService.registerUser(user);
  //}
    
  //create get /verify-email that have token as query param and send it to user-gateway service to verify the email 
   @Get('verify-email')
    async verifyEmail(@Query('token') token: string): Promise<any> {
     return this.userGatewayService.verifyEmail(token);
   }


   @Put('update-profile')
    async updateProfile(@Body() user: UpdateUserDTO): Promise<any> {
      return this.userGatewayService.updateProfile(user);
    }






}
