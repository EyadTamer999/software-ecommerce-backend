/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PayMobCreateOrderDTO } from './DTO/payment-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('paymob_auth')
  async getPayMobAuthToken(): Promise<any>{
    return this.appService.getPayMobAuthToken();
  }

  @MessagePattern('paymob_order')
  async getPayMobOrderID(order: PayMobCreateOrderDTO): Promise<any>{
    return this.appService.getPayMobOrderID(order);
  }

  @MessagePattern('paymob_payment_key')
  async getPaymobPaymentKey(payment_info: PayMobCreateOrderDTO): Promise<any> {
    return this.appService.getPaymobPaymentKey(payment_info)
  }
}
