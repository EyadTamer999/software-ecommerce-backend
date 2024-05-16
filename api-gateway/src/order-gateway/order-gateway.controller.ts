/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post ,Put,Req } from '@nestjs/common';
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
 
    @Get('get-orders-history')
    async getOrdersHistory(@Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getOrdersHistory(jwtToken);
    }

    @Get('get-order/:id')
    async getOrder(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getOrder(id,jwtToken);
    }

    @Delete('cancel-order/:id')
    async cancelOrder(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.cancelOrder(id,jwtToken);
    }



    //admin-----------------------
    @Get('get-order-queue')
    async getOrderQueue(@Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getOrderQueue(jwtToken);
    }

    @Get('all-orders-admin')
    async getAllOrders(@Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getAllOrders(jwtToken);
    }

    @Put('update-order-status/:id')
    async updateOrderStatus(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.updateOrderStatus(id,jwtToken);
    }

    @Put('update-order-status-closed/:id')
    async updateOrderStatusClosed(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.updateOrderStatusClosed(id,jwtToken);
    }
} 
