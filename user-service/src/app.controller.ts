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
  async viewAddress(data : {email :string}): Promise<any> {
    console.log("email:", data.email);
    return this.appService.viewAddress(data.email);
  }


  @MessagePattern('update_profile')
  @UseInterceptors(KafkaInterceptor)
  async updateProfile(@Payload() payload: {jwtToken: string, user: UpdateUserDTO}  , @Request() req ): Promise<any> {
    const { jwtToken, user } = payload;
    // console.log('jwtToken from kafka client:', jwtToken); 
    // console.log("req ya hodda : " , req.email)
    console.log('Received update profile request:', user);
    return this.appService.updateProfile(user , jwtToken);
  }

  @MessagePattern('view-profile')
  async viewProfile(data : {email :string}): Promise<any> {
    console.log("email:", data.email);
    return this.appService.viewProfile(data.email);
  }

  @MessagePattern('user_findByEmail')
    async findByEmail(data: LoginUserDTO): Promise<any> {
      console.log("from controller login:", data.email)
      return this.appService.findByEmail(data);
  } 




  @MessagePattern('add-address')
  async addAddress(data : {email :string, label: string, address: string}): Promise<any> {
    const payload= data.address[0]
    const label = payload['label']; 
    const address = payload['address'];
    
    console.log("payload:", payload, "type:", typeof payload, "controller")  
    
    console.log("email:", data.email
    ,"label:", label
    ,"address:", address, "controller"
    );
    return this.appService.addAddress(data.email, label, address);
  }


  @MessagePattern('delete-address')
  async deleteAddress(data : {email :string, id: string}): Promise<any> {
    console.log("email:", data.email
    ,"id:", data.id, "controller"
    );
    return this.appService.deleteAddress(data.email, data.id);
  }
}
