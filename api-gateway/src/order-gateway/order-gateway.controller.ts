/* eslint-disable prettier/prettier */
import { Body, Controller, Post ,Req } from '@nestjs/common';
import {OrderGatewayService} from './order-gateway.service'
import { CreateOrderDTO } from './DTO/createOrder.dto';

@Controller('order-gateway')
export class OrderGatewayController {
    constructor(private readonly orderGatewayService: OrderGatewayService) {}

    @Post('create-order')
    async createOrder(@Body() createOrderDto: CreateOrderDTO , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('createOrderDto from api-agteway: ', createOrderDto);
        return this.orderGatewayService.createOrder(createOrderDto ,jwtToken);
    }
}
