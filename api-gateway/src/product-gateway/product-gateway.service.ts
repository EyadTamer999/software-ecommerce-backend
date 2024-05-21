import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { createProductDto } from './DTO/createProduct.dto';

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
        this.kafkaClient.subscribeToResponseOf('deletProduct');
        this.kafkaClient.subscribeToResponseOf('createProduct');
    }
    async getAllProducts(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getAllProducts', {jwtToken}).toPromise();
    }
    async getProduct(id: string, jwtToken: any): Promise<any> {
        return this.kafkaClient.send('getProduct', {id, jwtToken}).toPromise();
    }
    async deleteProduct(id: string, jwtToken: any): Promise<any> {
        return this.kafkaClient.send('deleteProduct', {id, jwtToken}).toPromise();
    }
    async addToCart(userId: string, productId: string): Promise<any> {
        return this.kafkaClient.send('addToCart', {userId, productId}).toPromise();
    }

    async customizeProduct(productId: string, customizationOptions: any): Promise<any> {
        return this.kafkaClient.send('customizeProduct', {productId, customizationOptions}).toPromise();
    }

    async addReview(userId: string, productId: string, review: any): Promise<any> {
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


}