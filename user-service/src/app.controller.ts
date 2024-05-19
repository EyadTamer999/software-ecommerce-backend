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
  @UseInterceptors(KafkaInterceptor)
  async viewAddress(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];
    console.log("jwtToken:", JwtToken);
    return this.appService.viewAddress(JwtToken);
  }


  @MessagePattern('update_profile')
  @UseInterceptors(KafkaInterceptor)
  async updateProfile(@Payload() payload: {jwtToken: string, user: UpdateUserDTO} ): Promise<any> {
    const { jwtToken, user } = payload;
    // console.log('jwtToken from kafka client:', jwtToken); 
    // console.log("req ya hodda : " , req.email)
    // console.log('Received update profile request:', user);
    return this.appService.updateProfile(user , jwtToken);
  }

  @MessagePattern('view-profile')
  @UseInterceptors(KafkaInterceptor)
  async viewProfile(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];
    console.log("jwtToken from user service controller:", JwtToken);
    return this.appService.viewProfile(JwtToken);
  }

  @MessagePattern('user_findByEmail')
    async findByEmail(email: string): Promise<any> {
      console.log("from controller login:", email)
      return this.appService.findByEmail(email);
  }



  @MessagePattern('add-address')
  @UseInterceptors(KafkaInterceptor)
  async addAddress(  @Payload() payload: {jwtToken: string, data : { label: string, address: string}}): Promise<any> {

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
  async deleteAddress( @Payload() payload: {jwtToken: string, id: string}): Promise<any> {
    const { jwtToken, id } = payload;

    console.log(
    "id:", id, "controller"
    );
    return this.appService.deleteAddress(id["id"] , jwtToken);
  }

  //-----not for the admin its for creating user from auth service no api gateway for it
  @MessagePattern('create_user')
  async createUser(data: CreateUserDTO): Promise<any> {
    // console.log("data.......:", data);
    return this.appService.createUser(data);
  }

  @MessagePattern('GetUser-Email-link-token')
  async getUserEmailLinkToken(token :string): Promise<any> {
    return this.appService.getUserEmailLinkToken(token);
  }


  //-------not for updating profile 
  @MessagePattern('update-user')
  async updateUser(user: CreateUserDTO): Promise<any> {
    return this.appService.updateUser(user);
  }

  @MessagePattern('Get-all-Admins')
  async getAllAdmins():Promise<any>{
    return this.appService.getAllAdmins();
  }

  @MessagePattern('add-card')
  @UseInterceptors(KafkaInterceptor)
  async addCard(  @Payload() payload: {jwtToken: string, data : {name: string, cardnumber: string, expiration: string, cvv: string, cards:string}}): Promise<any> {

    const name = payload.data.cards[0]['name']; 
    const cardnumber = payload.data.cards[0]['cardnumber'];
    const expiration = payload.data.cards[0]['expiration'];
    const cvv = payload.data.cards[0]['cvv'];
    const jwtToken = payload.jwtToken;
    //console.log("payload:", payload, "type:", typeof payload, "controller")

    console.log(
    "name:", name,
    "cardnumber:", cardnumber,
    "expiration:", expiration,
    "cvv:", cvv, "controller"
    , "controller");
    return this.appService.addCard(name, cardnumber, expiration, cvv, jwtToken);
    
  }


  @MessagePattern('delete-card')
  @UseInterceptors(KafkaInterceptor)
  async deleteCard( @Payload() payload: {cvv: string,jwtToken: string}): Promise<any> {
    const { jwtToken, cvv } = payload;

    console.log(
     cvv, "controller"
    );
    console.log("cvv[cvv]:", cvv["cvv"]);
    return this.appService.deleteCard(cvv["cvv"] , jwtToken);
  }

}
