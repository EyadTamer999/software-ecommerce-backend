import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ReviewDto, createProductDto } from './DTO/createProduct.dto';

@Injectable()
export class ProductGatewayService {
    constructor(@Inject('PRODUCT_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('addToCart');
        this.kafkaClient.subscribeToResponseOf('customizeProduct');
        this.kafkaClient.subscribeToResponseOf('addReview');
        this.kafkaClient.subscribeToResponseOf('saveForLater');
        this.kafkaClient.subscribeToResponseOf('shareProduct');
        this.kafkaClient.subscribeToResponseOf('getAllProducts');
        this.kafkaClient.subscribeToResponseOf('getProduct');
        this.kafkaClient.subscribeToResponseOf('deleteProduct');
        this.kafkaClient.subscribeToResponseOf('createProduct');
        this.kafkaClient.subscribeToResponseOf('getCategory');
        this.kafkaClient.subscribeToResponseOf('getTopProducts');
        this.kafkaClient.subscribeToResponseOf('getTopOffers');
        //New Work !!!!!!!!!!!!!!!!!!!!!
        this.kafkaClient.subscribeToResponseOf('getUserFavoriteProducts');
        this.kafkaClient.subscribeToResponseOf('getUserWishProducts');
        this.kafkaClient.subscribeToResponseOf('removeProductFromMyWish');
        this.kafkaClient.subscribeToResponseOf('removeProductFromMyFavorite');
        this.kafkaClient.subscribeToResponseOf('postUserFavoriteProduct');
        this.kafkaClient.subscribeToResponseOf('postUserWishProduct');

    }
    async getAllProducts(): Promise<any> {
        return this.kafkaClient.send('getAllProducts',{}).toPromise();
    }
    async getTopProducts(): Promise<any> {
        return this.kafkaClient.send('getTopProducts', {}).toPromise();
    }
    async getTopOffers(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getTopOffers', {jwtToken}).toPromise();
    }
    async getCategory(category: String,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getCategory', {category,jwtToken}).toPromise();
    }
    async getProduct(id: any, jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getProduct', {id, jwtToken}).toPromise();
    }
    async deleteProduct(id: any, jwtToken: any): Promise<any> {
        return this.kafkaClient.send('deleteProduct', {id, jwtToken}).toPromise();
    }
    async addToCart(productId: string): Promise<any> {
        return this.kafkaClient.send('addToCart', {productId}).toPromise();
    }

    async customizeProduct(productId: string, size:string,color:string,material:string): Promise<any> {
        return this.kafkaClient.send('customizeProduct', {productId,size,color,material}).toPromise();
    }

    async addReview(userId: string, productId: string, review: ReviewDto): Promise<any> {
        return this.kafkaClient.send('addReview', {userId, productId, review}).toPromise();
    }

    async saveForLater(userId: string, productId: string): Promise<any> {
        return this.kafkaClient.send('saveForLater', {userId, productId}).toPromise();
    }

    async shareProduct(userId: string, productId: string, shareWith: string): Promise<any> {
        return this.kafkaClient.send('shareProduct', {userId, productId, shareWith}).toPromise();
    }

    async createProduct(product: createProductDto,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('createProduct', {product,jwtToken}).toPromise();
    }

    //NEW WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    async getUserFavoriteProducts( jwtToken: string): Promise<any> {
        return this.kafkaClient.send('getUserFavoriteProducts',{ jwtToken}).toPromise();
    }
    async getUserWishProducts( jwtToken: string): Promise<any> {
        return this.kafkaClient.send('getUserWishProducts',{ jwtToken}).toPromise();
    }
    async removeProductFromMyWish( productId: string,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('removeProductFromMyWish',{ productId,jwtToken}).toPromise();
    }
    async removeProductFromMyFavorite(productId: string,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('removeProductFromMyFavorite',{ productId,jwtToken}).toPromise();
    }
    //postUserFavoriteProduct
    async postUserFavoriteProduct( productId: string,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('postUserFavoriteProduct',{ productId,jwtToken}).toPromise();
    }
    //postUserWishProduct
    async postUserWishProduct( productId: string,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('postUserWishProduct',{ productId,jwtToken}).toPromise();
    }


}