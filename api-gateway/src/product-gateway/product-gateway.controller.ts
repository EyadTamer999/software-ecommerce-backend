/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post ,Put, Query, Req } from '@nestjs/common';
import { ProductGatewayService } from './product-gateway.service';
import { createProductDto } from './DTO/createProduct.dto';
import { AddToCartDTO } from './DTO/addToCart.dto';

@Controller('Product')
export class ProductGatewayController {
    constructor(private readonly productGatewayService: ProductGatewayService) { }
    
    // DONE
    @Get('getAllProducts')
    async getAllProducts(): Promise<any> {
        return this.productGatewayService.getAllProducts();
    }

    // DONE
    @Get('getTopProducts')
    async getTopProduct(): Promise<any> {
        return this.productGatewayService.getTopProducts();
    }

    // DONE
    @Get('getTopOffers')
    async getTopOffers(): Promise<any> {
        return this.productGatewayService.getTopOffers();
    }

    // DONE
    @Get('getCategory/:category')
    async getCategory(@Param('category') category: string): Promise<any> {
        return this.productGatewayService.getCategory(category);
    }

    // DONE
    @Get('getProduct/:id')
    async getProduct(@Param('id') id: string): Promise<any> {

        return this.productGatewayService.getProduct(id);
    }

    // DONE
    @Delete('deleteProduct/:id')
    async deleteProduct(@Param('id') id: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');

        return this.productGatewayService.deleteProduct(id, jwtToken);
    }


    // DONE
    @Post('addToCart')
    async addToCart(@Body() body: AddToCartDTO, @Req() request: any): Promise<any> {
        console.log('Body',body);
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.addToCart(body, jwtToken);
    }

    // TODO mesh betmsa7 fel database
    @Delete('deleteFromCart/:id')
    async deleteFromCart(@Param('id') id: string,  @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.deleteFromCart(id, jwtToken);
    }

    // DONE
    @Get('getCart')
    async getCartItems(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getCartItems(jwtToken);
    }
    
    // DONE
    @Post('customizeProduct')
    async customizeProduct(@Body() body: any): Promise<any> {
        const { productId, size,color,material } = body;
        return this.productGatewayService.customizeProduct(productId, size,color,material);
    }
    
    // DONE
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
    // DONE
    @Get('getUserReviews')
    async getUserReviews(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getUserReviews(jwtToken);
    }   
    //update user review on a product
    // DONE
    @Put('updateUserReview')
    async updateUserReview(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId, review} = body;
        return this.productGatewayService.updateUserReview( productId, review, jwtToken);
    }
    //delete user review on a product
    // DONE
    @Delete('deleteUserReview')
    async deleteUserReview(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('Body',body);
        const {productId} = body;
        return this.productGatewayService.deleteUserReview( productId, jwtToken);
    }





    //DONE
    @Post('createProduct')
    async createProduct(@Body() product: createProductDto, @Req() request: any): Promise<any> {
       const jwtToken = request.headers.authorization?.replace('Bearer ', '');
       console.log('Product',product);
        return this.productGatewayService.createProduct(product, jwtToken);
    }








    
    // DONE
    @Get('getUserFavoriteProducts')
    async getUserFavoriteProducts(@Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getUserFavoriteProducts(jwtToken);
    }

    // DONE
    @Get('getUserWishProducts')
    async getUserWishProducts( @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.productGatewayService.getUserWishProducts( jwtToken);
    }

    // DONE
    @Delete('removeProductFromMyWish')
    async removeProductFromMyWish(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const { productId } = body;
        return this.productGatewayService.removeProductFromMyWish(productId, jwtToken);
    }

    // DONE
    @Delete('removeProductFromMyFavorite')
    async removeProductFromMyFavorite(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log(body)
        const {  productId } = body;
        return this.productGatewayService.removeProductFromMyFavorite( productId, jwtToken);
    }

    // DONE
    @Post('postUserFavoriteProduct')
    async postUserFavoriteProduct(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId } = body;
        return this.productGatewayService.postUserFavoriteProduct( productId, jwtToken);
    }

    // DONE
    @Post('postUserWishProduct')
    async postUserWishProduct(@Body() body: any, @Req() request: any): Promise<any> {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        const {  productId } = body;
        return this.productGatewayService.postUserWishProduct( productId, jwtToken);
    }

    
}