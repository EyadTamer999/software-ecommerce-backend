import { Body, Controller, Delete, Get, Param, Post ,Put, Req } from '@nestjs/common';
import { ProductGatewayService } from './product-gateway.service';
import { createProductDto } from './DTO/createProduct.dto';

@Controller('product-gateway')
export class ProductGatewayController {
    constructor(private readonly productGatewayService: ProductGatewayService) {}
    @Get('getAllProducts')
    async getAllProducts(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.getAllProducts(jwtToken);
    }

    @Get('getProduct/:id')
    async getProduct(@Param('id') id: string, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.getProduct(id, jwtToken);
    }

    @Delete('deletProduct/:id')
    async deleteProduct(@Param('id') id: string, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.deleteProduct(id, jwtToken);
    }

    @Post('addToCart')
    async addToCart(@Body() body: any): Promise<any> {
        const { userId, productId } = body;
        return this.productGatewayService.addToCart(userId, productId);
    }

    @Post('customizeProduct')
    async customizeProduct(@Body() body: any): Promise<any> {
        const { productId, customizationOptions } = body;
        return this.productGatewayService.customizeProduct(productId, customizationOptions);
    }

    @Post('addReview')
    async addReview(@Body() body: any): Promise<any> {
        const { userId, productId, review } = body;
        return this.productGatewayService.addReview(userId, productId, review);
    }

    @Post('saveForLater')
    async saveForLater(@Body() body: any): Promise<any> {
        const { userId, productId } = body;
        return this.productGatewayService.saveForLater(userId, productId);
    }

    @Post('shareProduct')
    async shareProduct(@Body() body: any): Promise<any> {
        const { userId, productId, shareWith } = body;
        return this.productGatewayService.shareProduct(userId, productId, shareWith);
    }

    @Post('createProduct')
    async createProduct(@Body() product: createProductDto, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.createProduct(product, jwtToken);
    }
    
}