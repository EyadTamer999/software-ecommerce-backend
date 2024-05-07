/* eslint-disable prettier/prettier */
import { Controller, Get ,UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UpdateUserDTO } from './DTO/updateuser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_profile')
  async updateProfile(data: UpdateUserDTO): Promise<any> {
    console.log('Received update profile request:', data);
    return this.appService.updateProfile(data);
  }
  @MessagePattern('user_findByEmail')
    async findByEmail(data: LoginUserDTO): Promise<any> {
      console.log("from controller login:", data.email)
      return this.appService.findByEmail(data);
  }

}
