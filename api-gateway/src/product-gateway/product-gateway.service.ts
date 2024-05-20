import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProductGatewayService {
    constructor(@Inject('PRODUCT_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('create_product');
        this.kafkaClient.subscribeToResponseOf('get_products');
        this.kafkaClient.subscribeToResponseOf('get_product');
        this.kafkaClient.subscribeToResponseOf('delete_product');
        this.kafkaClient.subscribeToResponseOf('get_all_products');
        this.kafkaClient.subscribeToResponseOf('update_product');
    }

    async createProduct(createProductDto: any , jwtToken : any): Promise<any> {
        return this.kafkaClient.send('create_product', {createProductDto ,jwtToken}).toPromise();
    }

    async getProducts(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_products', {jwtToken}).toPromise();
    }

    async getProduct(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_product', { id,jwtToken}).toPromise();
    }

    async deleteProduct(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('delete_product', { id,jwtToken}).toPromise();
    }

    //admin-----------------------
    async getAllProducts(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_all_products', {jwtToken}).toPromise();
    }

    async updateProduct(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('update_product', { id,jwtToken}).toPromise();
    }
}