/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ReviewDto, createProductDto } from './DTO/createProduct.dto';
import { AddToCartDTO } from './DTO/addToCart.dto';


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

    }
    async getAllProducts(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getAllProducts', {jwtToken}).toPromise();
    }
    async getTopProducts(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getTopProducts', {jwtToken}).toPromise();
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
    async addToCart(body: AddToCartDTO, jwtToken: any): Promise<any> {
        return this.kafkaClient.send('addToCart', {body, jwtToken}).toPromise();
    }
    deleteFromCart(id: string, jwtToken: any): any {
        return this.kafkaClient.send('deleteFromCart', {id, jwtToken}).toPromise();
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

    async createProduct(product: any,jwtToken: string): Promise<any> {
        return this.kafkaClient.send('createProduct', {product,jwtToken}).toPromise();
    }


}