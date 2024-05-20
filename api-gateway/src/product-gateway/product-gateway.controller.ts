/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post ,Put,Req } from '@nestjs/common';
import {ProductGatewayService} from './product-gateway.service'
import { CreateProductDTO } from './DTO/createProduct.dto';
 
@Controller('product-gateway')
export class ProductGatewayController {
    constructor(private readonly productGatewayService: ProductGatewayService) {}

    @GET('create-order')
    async createOrder(@Body() createOrderDto: CreateProductDTO , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('createOrderDto from api-agteway: ', createOrderDto);
        return this.orderGatewayService.createOrder(createOrderDto ,jwtToken);
    }




    
} 
