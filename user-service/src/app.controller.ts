/* eslint-disable prettier/prettier */
import { Controller, Get ,Req,Request,UseGuards ,UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';

import { UpdateUserDTO } from './DTO/updateuser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { KafkaInterceptor } from './guards/kafka-Interceptor';

import { get } from 'http';


 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('view-address')
  //@UseInterceptors(KafkaInterceptor)
  async viewAddress(jwtToken: string): Promise<any> {
    console.log("jwtToken:", jwtToken);
    return this.appService.viewAddress(jwtToken);
  }


  @MessagePattern('update_profile')
  @UseInterceptors(KafkaInterceptor)
  async updateProfile(@Payload() payload: {jwtToken: string, user: UpdateUserDTO}  , @Request() req ): Promise<any> {
    const { jwtToken, user } = payload;
    // console.log('jwtToken from kafka client:', jwtToken); 
    // console.log("req ya hodda : " , req.email)
    // console.log('Received update profile request:', user);
    return this.appService.updateProfile(user , jwtToken);
  }

  @MessagePattern('view-profile')
  //@UseInterceptors(KafkaInterceptor)
  async viewProfile(jwtToken: string): Promise<any> {
    console.log("jwtToken:", jwtToken);
    return this.appService.viewProfile(jwtToken);
  }

  @MessagePattern('user_findByEmail')
    async findByEmail(data: LoginUserDTO): Promise<any> {
      console.log("from controller login:", data.email)
      return this.appService.findByEmail(data);
  } 




  @MessagePattern('add-address')
  @UseInterceptors(KafkaInterceptor)
  async addAddress(  @Payload() payload: {jwtToken: string, data : { label: string, address: string}}  , @Request() req): Promise<any> {
    
    const label = payload.data.address[0]['label']; 
    const address = payload.data.address[0]['address'];
    const jwtToken = payload.jwtToken;
    //console.log("payload:", payload, "type:", typeof payload, "controller")  
    
    console.log(
    "label:", label,
    "address:", address, "controller"
    );
    return this.appService.addAddress(label, address, jwtToken);
  }


  @MessagePattern('delete-address')
  @UseInterceptors(KafkaInterceptor)
  async deleteAddress( @Payload() payload: {jwtToken: string, id: string}, @Request() req): Promise<any> {
    const { jwtToken, id } = payload;

    console.log(
    "id:", id, "controller"
    );
    return this.appService.deleteAddress(id["id"] , jwtToken);
  }
}
