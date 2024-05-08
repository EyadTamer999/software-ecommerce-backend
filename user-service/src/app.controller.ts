/* eslint-disable prettier/prettier */
import { Controller, Get ,UseGuards ,UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UpdateUserDTO } from './DTO/updateuser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @MessagePattern('update_profile')
  @UseInterceptors(KafkaInterceptor)
  async updateProfile(@Payload() payload: {jwtToken: string, user: UpdateUserDTO}): Promise<any> {
    const { jwtToken, user } = payload;
    // console.log('jwtToken from kafka client:', jwtToken); 

    console.log('Received update profile request:', user);
    return this.appService.updateProfile(user);
  }
  @MessagePattern('user_findByEmail')
    async findByEmail(data: LoginUserDTO): Promise<any> {
      console.log("from controller login:", data.email)
      return this.appService.findByEmail(data);
  } 




}
