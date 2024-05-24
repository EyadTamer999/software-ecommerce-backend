import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ReviewDto, createProductDto } from './DTO/createProduct.dto';

@Injectable()
export class ProductGatewayService {
    constructor(@Inject('PRODUCT_SERVICE') private readonly kafkaClient: ClientKafka) {
        //this.kafkaClient.subscribeToResponseOf('addToCart');
        
        this.kafkaClient.subscribeToResponseOf('customizeProduct');
        this.kafkaClient.subscribeToResponseOf('addReview');
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
        this.kafkaClient.subscribeToResponseOf('getUserReviews');
        this.kafkaClient.subscribeToResponseOf('updateUserReview');
        this.kafkaClient.subscribeToResponseOf('deleteUserReview');

    }
    //tested
    async createProduct(product: createProductDto,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('createProduct', {product,jwtToken}).toPromise();
    }
    //tested
    async getAllProducts(): Promise<any> {
        return this.kafkaClient.send('getAllProducts',{}).toPromise();
    }
    //tested
    async getTopProducts(): Promise<any> {
        return this.kafkaClient.send('getTopProducts', {}).toPromise();
    }
    //tested
    async getTopOffers(): Promise<any> {
        return this.kafkaClient.send('getTopOffers', {}).toPromise();
    }
    //tested
    async getCategory(category: String): Promise<any> {
        return this.kafkaClient.send('getCategory', {category}).toPromise();
    }
    //tested
    async getProduct(id: any): Promise<any> {
        return this.kafkaClient.send('getProduct', {id}).toPromise();
    }
    //tested
    async deleteProduct(id: any, jwtToken: any): Promise<any> {
        return this.kafkaClient.send('deleteProduct', {id, jwtToken}).toPromise();
    }
    // async addToCart(productId: string): Promise<any> {
    //     return this.kafkaClient.send('addToCart', {productId}).toPromise();
    // }
    //tested
    async customizeProduct(productId: string, size:string,color:string,material:string): Promise<any> {
        return this.kafkaClient.send('customizeProduct', {productId,size,color,material}).toPromise();
    }


    //tested
    //Start Review SeCtion
    async addReview(productId: string, review: ReviewDto,jwtToken:string): Promise<any> {
        return this.kafkaClient.send('addReview', { productId, review,jwtToken}).toPromise();
    }
    async getUserReviews(jwtToken: string): Promise<any> {
        return this.kafkaClient.send('getUserReviews', {jwtToken}).toPromise();
    }
    async updateUserReview(productId: string,review: ReviewDto,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('updateUserReview', {productId,review,jwtToken}).toPromise();
    }
    //deleteUserReview
    async deleteUserReview(productId: string,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('deleteUserReview', {productId,jwtToken}).toPromise();
    }

    //End Review Section

    //tested
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