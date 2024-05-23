import { Body, Controller, Delete, Get, Param, Post ,Put, Req } from '@nestjs/common';
import { ProductGatewayService } from './product-gateway.service';
import { createProductDto } from './DTO/createProduct.dto';

@Controller('Product')
export class ProductGatewayController {
    constructor(private readonly productGatewayService: ProductGatewayService) {}
    @Get('getAllProducts')
    async getAllProducts(): Promise<any> {
        return this.productGatewayService.getAllProducts();
    }
    @Get('getTopProducts')
    async getTopProduct(): Promise<any> {
        return this.productGatewayService.getTopProducts();
    }
    @Get('getTopOffers')
    async getTopOffers(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('jwtToken:', jwtToken);
        return this.productGatewayService.getTopOffers(jwtToken);
    }
    @Get('getCategory/:category')
    async getCategory(@Param('category') category: string,@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('jwtToken:', jwtToken);
        return this.productGatewayService.getCategory(category,jwtToken);
    }

    @Get('getProduct/:id')
    async getProduct(@Param('id') id: string, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getProduct(id, jwtToken);
    }

    @Delete('deleteProduct/:id')
    async deleteProduct(@Param('id') id: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.deleteProduct(id, jwtToken);
    }

    @Post('addToCart')
    async addToCart(@Body() body: any): Promise<any> {
        const {  productId } = body;
        return this.productGatewayService.addToCart(productId);
    }

    @Post('customizeProduct')
    async customizeProduct(@Body() body: any): Promise<any> {
        const { productId, size,color,material } = body;
        return this.productGatewayService.customizeProduct(productId, size,color,material);
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
       const jwtToken = request.headers.authorization?.replace('Bearer ', '');
       console.log('Product',product);
        return this.productGatewayService.createProduct(product, jwtToken);
    }
    
}