/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post ,Put,Req } from '@nestjs/common';
import {OrderGatewayService} from './order-gateway.service'
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { CreateDeliveryFeeDTO } from './DTO/createDeliveryFee.Dto';
import { PromoCodeDto } from './DTO/PromoCode.Dto';
 
@Controller('order-gateway')
export class OrderGatewayController {
    constructor(private readonly orderGatewayService: OrderGatewayService) {}

    @Post('create-order')
    async createOrder(@Body() createOrderDto: CreateOrderDTO , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('createOrderDto from api-agteway: ', createOrderDto);
        return this.orderGatewayService.createOrder(createOrderDto ,jwtToken);
    }
    @Post('update-product-quantity')
    async updateProductQuantity(@Body() createOrderDto : CreateOrderDTO , @Req() request): Promise<any>{
        // const {id , quantity} = data;
        console.log('dto from cont', createOrderDto)
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.updateProductQuantity(createOrderDto,jwtToken );
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
    //-------not tested yet
    @Post('add-delivery-fee')
    async addDeliveryFee(@Body() createDeliveryFeeDTO :CreateDeliveryFeeDTO , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.addDeliveryFee(createDeliveryFeeDTO,jwtToken);
    }
    @Delete('delete-delery-fee/:id')
    async deleteDeliveryFee(@Param('id') id : string , @Req() request): Promise<any>{
        console.log('id from api-gateway:', id);
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.deleteDeliveryFee(id,jwtToken);
    }
    @Get('Get-all-Delivery-Fees')
    async getAllDeliveryFees(@Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getAllDeliveryFees(jwtToken);
    }

    @Post('add-promo-code')
    async addPromoCode(@Body() promoCodeDto :PromoCodeDto , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.addPromoCode(promoCodeDto,jwtToken);
    }

    @Get('Get-promo-code')
    async getPromoCode(@Body() promocode : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('promocode from api-gateway:', promocode);
        return this.orderGatewayService.getPromoCode(promocode,jwtToken);
    }


    
} 
