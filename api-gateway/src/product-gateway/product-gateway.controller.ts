import { Body, Controller, Delete, Get, Param, Post ,Put, Req } from '@nestjs/common';
import { ProductGatewayService } from './product-gateway.service';
import { createProductDto } from './DTO/createProduct.dto';

@Controller('product-gateway')
export class ProductGatewayController {
    constructor(private readonly productGatewayService: ProductGatewayService) {}

    @Post('create-product')
    async createProduct(@Body() createProductDto: CreateProductDTO , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('createProductDto from api-gateway: ', createProductDto);
        return this.productGatewayService.createProduct(createProductDto ,jwtToken);
    }

    @Get('get-products')
    async getProducts(@Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getProducts(jwtToken);
    }

    @Get('get-product/:id')
    async getProduct(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getProduct(id,jwtToken);
    }

    @Delete('delete-product/:id')
    async deleteProduct(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.deleteProduct(id,jwtToken);
    }

    //admin-----------------------
    @Get('get-all-products')
    async getAllProducts(@Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getAllProducts(jwtToken);
    }

    @Put('update-product/:id')
    async updateProduct(@Param('id') id : string , @Req() request): Promise<any>{
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.updateProduct(id,jwtToken);
    }
}