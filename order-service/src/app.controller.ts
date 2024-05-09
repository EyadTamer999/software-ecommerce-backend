/* eslint-disable prettier/prettier */
import { Controller, Get ,UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { KafkaInterceptor } from './guards/kafka-Interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @MessagePattern('create_order')
  @UseInterceptors(KafkaInterceptor)
  async createOrder(@Payload() payload: { createOrderDto:CreateOrderDTO ,jwtToken: string} ): Promise<any> {
    const { createOrderDto, jwtToken } = payload;
    console.log('Received create order request in kafka :', createOrderDto);
    console.log('recived token in kafka' , jwtToken);
    return this.appService.createOrder(createOrderDto , jwtToken);
  }

}
