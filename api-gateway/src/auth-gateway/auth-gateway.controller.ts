/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';
import { LoginUserDTO } from './DTO/logindto.dto';

@Controller('auth-gateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('verify')
  async registerUser(@Body() user: CreateUserDto): Promise<any> {
    return this.authGatewayService.verifyRegisterUser(user);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<any> {
   return this.authGatewayService.verifyEmail(token);
 }

 @Put('resend-email')
  async resendEmail(@Query('email') email: string): Promise<any> {
    console.log('resend email controller :', email);
    return this.authGatewayService.resendEmail(email);
  }
  @Post('login')
  async login(@Body() user: LoginUserDTO) : Promise<any> {
    return this.authGatewayService.loginUser(user)
  }

  @Put('Update-Password')
  async updatePassword(@Body() data: {oldpassword: string, newpassword: string},@Req() request: any) : Promise<any> {
    const jwtToken = request.headers.authorization?.replace('Bearer ', '');
    return this.authGatewayService.updatePassword(data, jwtToken)
  }


  @Put('forgot-password')
  async forgotPassword(@Body() email: string ) : Promise<any> {
    return this.authGatewayService.forgotPassword(email)
  }

  @Put('reset-password')
  async resetPassword(@Query('token') token: string, @Query('email') email: string, @Body('newPassword') newPassword: string ) : Promise<any> {
    // console.log('token:', token , 'email:', ' ----- ' , email , '-----' ,'newPassword:', newPassword);
    return this.authGatewayService.resetPassword(token, email , newPassword);
  }




}
