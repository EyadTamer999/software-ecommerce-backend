/* eslint-disable prettier/prettier */
import { Controller ,UseGuards,UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { AdminAuthorizationGuard } from './guards/adminAuthorization.guard';
import { CreateDeliveryFeeDTO } from './DTO/createDeliveryFee.Dto';
import { PromoCodeDto } from './DTO/PromoCode.Dto';
import { log } from 'console';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @MessagePattern("order-product-quantity")
  @UseInterceptors(KafkaInterceptor)
  async updateProductQuantity(@Payload() payload:{createOrderDto : CreateOrderDTO  , jwtToken: string}): Promise<any> {
    const { createOrderDto, jwtToken } = payload;
    // console.log('Received update product quantity request in kafka :', jwtToken);
    return this.appService.updateProductQuantity(createOrderDto,jwtToken);
  }
 
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

  @MessagePattern('add_delivery_fee')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async addDeliveryFee(@Payload() payload:{createDeliveryFeeDTO :CreateDeliveryFeeDTO , jwtToken: string } ): Promise<any> {
    const { createDeliveryFeeDTO, jwtToken } = payload;
    // console.log('Received add delivery fee request in kafka :', createDeliveryFeeDTO);
    return this.appService.addDeliveryFee(createDeliveryFeeDTO,jwtToken);
  }

  @MessagePattern('delete_delivery_fee')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async deleteDeliveryFee(@Payload() payload:{id:string , jwtToken: string } ): Promise<any> {
    const { id, jwtToken } = payload;
    console.log('id from kafka:', id);
    // console.log('Received delete delivery fee request in kafka :', jwtToken);
    return this.appService.deleteDeliveryFee(id,jwtToken);
  }

  @MessagePattern('get_delivery_fee')
  @UseInterceptors(KafkaInterceptor)
  async getDeliveryFee(@Payload() jwtToken: string): Promise<any> {
    return this.appService.getDeliveryFee();
  }

  @MessagePattern('add_promo_code')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async addPromoCode(@Payload() payload:{createPromoCodeDTO : PromoCodeDto , jwtToken: string } ): Promise<any> {
    const { createPromoCodeDTO, jwtToken } = payload;
    // console.log('Received add promo code request in kafka :', code);
    return this.appService.addPromoCode(createPromoCodeDTO,jwtToken);
  }

  @MessagePattern('get_promo_code')
  @UseInterceptors(KafkaInterceptor)
  async getPromoCode(@Payload() payload:{promocode:string , jwtToken: string } ): Promise<any> {
    const { promocode, jwtToken } = payload;
    // console.log('Received get promo code request in kafka :', id);
    return this.appService.getPromoCode(promocode,jwtToken);
  }
  

}
