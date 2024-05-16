/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Query, Req,Delete } from '@nestjs/common';
import { PaymentPaymobGatewayService } from './payment-paymob-gateway.service';
import { PayMobCreateOrderDTO } from './DTO/payment-order.dto';
import { PayMobPaymentKeyDTO } from './DTO/payment-key.dto';

@Controller('payment-gateway')
export class PaymentPaymobGatewayController {
    constructor(private readonly paymentGatewayService: PaymentPaymobGatewayService){}

    @Get('payment-auth')
    async payMobAuth(): Promise<any> {
        return this.paymentGatewayService.paymMobAuth();
    }

    @Get('payment-order')
    async payMobOrder(@Body() order: PayMobCreateOrderDTO): Promise<any> {
        return this.paymentGatewayService.paymMobOrder(order);
    }

    @Get('payment-key')
    async payMobPaymentKey(@Body() payment_info: PayMobCreateOrderDTO): Promise<any> {
        return this.paymentGatewayService.payMobPaymentKey(payment_info);
    }

}
