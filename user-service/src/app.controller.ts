/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './DTO/createUser.dto';
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
