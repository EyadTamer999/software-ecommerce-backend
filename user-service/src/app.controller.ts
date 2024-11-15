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
    return this.appService.viewProfile(JwtToken);
  }

  @MessagePattern('user_findByEmail')
    async findByEmail(email: string): Promise<any> {
      return this.appService.findByEmail(email);
  }



  @MessagePattern('add-address')
  @UseInterceptors(KafkaInterceptor)
  async addAddress(  @Payload() payload: {jwtToken: string, data : { label: string, appartment: string, floor:string, street:string, building:string, postalcode:string, city:string, country:string, state:string, extra_description:string }}): Promise<any> {


    const label = payload.data.label;
    const appartment = payload.data.appartment;
    const floor = payload.data.floor;
    const street = payload.data.street;
    const building = payload.data.building;
    const postalcode = payload.data.postalcode;
    const city = payload.data.city;
    const country = payload.data.country;
    const state = payload.data.state;
    const extra_description = payload.data.extra_description;
    const jwtToken = payload.jwtToken; 
    //const address = payload.data.address[0]['address'];
    //const jwtToken = payload.jwtToken;
    //console.log("payload:", payload, "type:", typeof payload, "controller")

    console.log(
    "label:", label,
    "appartment:", appartment,
    "floor:", floor,
    "street:", street,
    "building:", building,
    "postalcode:", postalcode,
    "city:", city,
    "country:", country,
    "state:", state,
    "extra_description:", extra_description,
    "user controller"
    );
    return this.appService.addAddress(label, appartment,floor,street,building,postalcode,city,country,state,extra_description, jwtToken);
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
  @MessagePattern('Get-All-Users')
  async getAllUsers():Promise<any>{
    return this.appService.getAllusers();
  }

  @MessagePattern('add-card')
  @UseInterceptors(KafkaInterceptor)
  async addCard(  @Payload() payload: {jwtToken: string, data : {name: string, cardnumber: string, expiration: string, cvv: string, cards:string}}): Promise<any> {

    const name = payload.data.name; 
    const cardnumber = payload.data.cardnumber;
    const expiration = payload.data.expiration;
    const cvv = payload.data.cvv;
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

  @MessagePattern('view-card')
  @UseInterceptors(KafkaInterceptor)
  async viewCard(@Payload()payload: {jwtToken: string}): Promise<any> {
    const JwtToken = payload.jwtToken;
    console.log("user controller jwtToken:", JwtToken);
    return this.appService.viewCard(JwtToken);
  }

  @MessagePattern('delete-card')
  @UseInterceptors(KafkaInterceptor)
  async deleteCard( @Payload() payload: {id: string,jwtToken: string}): Promise<any> {
    const { jwtToken, id } = payload;
    console.log("id from user controller:", id);
    // console.log(
    //  cvv, "controller"
    // );
    console.log("id[id]:", id["id"]);
    return this.appService.deleteCard(id , jwtToken);
  }

}
