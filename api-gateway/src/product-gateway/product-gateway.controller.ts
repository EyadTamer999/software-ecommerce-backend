/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post ,Put, Query, Req } from '@nestjs/common';
import { ProductGatewayService } from './product-gateway.service';
import { createProductDto } from './DTO/createProduct.dto';
import { AddToCartDTO } from './DTO/addToCart.dto';

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
    async getTopOffers(): Promise<any> {
        return this.productGatewayService.getTopOffers();
    }
    @Get('getCategory/:category')
    async getCategory(@Param('category') category: string): Promise<any> {
        return this.productGatewayService.getCategory(category);
    }

    @Get('getProduct/:id')
    async getProduct(@Param('id') id: string): Promise<any> {

        return this.productGatewayService.getProduct(id);
    }

    @Delete('deleteProduct/:id')
    async deleteProduct(@Param('id') id: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');

        return this.productGatewayService.deleteProduct(id, jwtToken);
    }


    @Post('addToCart')
    async addToCart(@Body() body: AddToCartDTO, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.addToCart(body, jwtToken);
    }
    @Delete('deleteFromCart/:id')
    async deleteFromCart(@Param('id') id: string,  @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.deleteFromCart(id, jwtToken);
    }
    @Get('getCart')
    async getCartItems(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getCartItems(jwtToken);
    }
    

    @Post('customizeProduct')
    async customizeProduct(@Body() body: any): Promise<any> {
        const { productId, size,color,material } = body;
        return this.productGatewayService.customizeProduct(productId, size,color,material);
    }
    //Start Review Sevtion
    @Post('addReview')
    async addReview(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const { productId, review, } = body;
        console.log('Product', productId);
        console.log('Review', review);
        console.log('jwtToken', jwtToken);
        return this.productGatewayService.addReview( productId, review, jwtToken);
    }

    //get all user reviews
    @Get('getUserReviews')
    async getUserReviews(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getUserReviews(jwtToken);
    }   
    //update user review on a product
    @Put('updateUserReview')
    async updateUserReview(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId, review} = body;
        return this.productGatewayService.updateUserReview( productId, review, jwtToken);
    }
    //delete user review on a product
    @Delete('deleteUserReview')
    async deleteUserReview(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId} = body;
        return this.productGatewayService.deleteUserReview( productId, jwtToken);
    }




    //End Review Section

    @Post('createProduct')
    async createProduct(@Body() product: createProductDto, @Req() request: any): Promise<any> {
       const jwtToken = request.headers.authorization?.replace('Bearer ', '');
       console.log('Product',product);
        return this.productGatewayService.createProduct(product, jwtToken);
    }








    //new work!!!!!!
    
    @Get('getUserFavoriteProducts')
    async getUserFavoriteProducts(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getUserFavoriteProducts(jwtToken);
    }

    @Get('getUserWishProducts')
    async getUserWishProducts( @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getUserWishProducts( jwtToken);
    }

    @Delete('removeProductFromMyWish')
    async removeProductFromMyWish(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const { productId } = body;
        return this.productGatewayService.removeProductFromMyWish(productId, jwtToken);
    }

    @Delete('removeProductFromMyFavorite')
    async removeProductFromMyFavorite(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId } = body;
        return this.productGatewayService.removeProductFromMyFavorite( productId, jwtToken);
    }

    @Post('postUserFavoriteProduct')
    async postUserFavoriteProduct(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId } = body;
        return this.productGatewayService.postUserFavoriteProduct( productId, jwtToken);
    }

    @Post('postUserWishProduct')
    async postUserWishProduct(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId } = body;
        return this.productGatewayService.postUserWishProduct( productId, jwtToken);
    }

    
}