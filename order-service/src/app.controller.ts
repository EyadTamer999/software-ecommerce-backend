/* eslint-disable prettier/prettier */
import { Controller, Get ,UseGuards,UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { AdminAuthorizationGuard } from './guards/adminAuthorization.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @MessagePattern('create_order')
  @UseInterceptors(KafkaInterceptor)
  async createOrder(@Payload() payload: { createOrderDto:CreateOrderDTO ,jwtToken: string} ): Promise<any> {
    const { createOrderDto, jwtToken } = payload;
    // console.log('Received create order request in kafka :', createOrderDto);
    // console.log('recived token in kafka' , jwtToken);
    return this.appService.createOrder(createOrderDto , jwtToken);
  }

  @MessagePattern('get_orders_history')
  @UseInterceptors(KafkaInterceptor)
  async getOrdersHistory(@Payload() jwtToken: string): Promise<any> {
    // console.log('Received get orders history request in kafka :', jwtToken['jwtToken']);
    const JwtToken = jwtToken['jwtToken'];
    return this.appService.getOrdersHistory(JwtToken);
  }


  @MessagePattern('get_order')
  @UseInterceptors(KafkaInterceptor)
  async getOrder(@Payload() payload:{id:string , jwtToken: string } ): Promise<any> {
    const { id, jwtToken } = payload;
    // console.log('Received get order request in kafka :', jwtToken);
    return this.appService.getOrder(id,jwtToken);
  }



  @MessagePattern('cancel_order')
  @UseInterceptors(KafkaInterceptor)
  async cancelOrder(@Payload() payload:{id:string , jwtToken: string } ): Promise<any> {
    const { id, jwtToken } = payload;
    // console.log('Received cancel order request in kafka :', jwtToken);
    return this.appService.cancelOrder(id,jwtToken);
  }

  // admin-----------------------
  @MessagePattern('get_order_queue')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async getOrderQueue(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];

    // console.log('Received get order queue request in kafka :', jwtToken);
    return this.appService.getOrderQueue(JwtToken);
  }

  @MessagePattern('get_all_orders')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async getAllOrders(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];

    // console.log('Received get all orders request in kafka :', jwtToken);
    return this.appService.getAllOrders(JwtToken);
  }

  @MessagePattern('update_order_status')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async updateOrderStatus(@Payload() payload:{id:string , jwtToken: string } ): Promise<any> {
    const { id, jwtToken } = payload;
    // console.log('Received update order status request in kafka :', jwtToken);
    return this.appService.updateOrderStatus(id,jwtToken);
  }

  @MessagePattern('update_order_status_closed')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async updateOrderStatusClosed(@Payload() payload:{id:string , jwtToken: string } ): Promise<any> {
    const { id, jwtToken } = payload;
    // console.log('Received update order status closed request in kafka :', jwtToken);
    return this.appService.updateOrderStatusClosed(id,jwtToken);
  }
  

}
