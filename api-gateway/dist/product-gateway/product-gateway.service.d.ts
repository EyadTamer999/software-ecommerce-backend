import { ClientKafka } from '@nestjs/microservices';
import { createProductDto } from './DTO/createProduct.dto';
export declare class ProductGatewayService {
    private readonly kafkaClient;
    constructor(kafkaClient: ClientKafka);
    getAllProducts(jwtToken: any): Promise<any>;
    getProduct(id: string, jwtToken: any): Promise<any>;
    deleteProduct(id: string, jwtToken: any): Promise<any>;
    addToCart(userId: string, productId: string): Promise<any>;
    customizeProduct(productId: string, customizationOptions: any): Promise<any>;
    addReview(userId: string, productId: string, review: any): Promise<any>;
    saveForLater(userId: string, productId: string): Promise<any>;
    shareProduct(userId: string, productId: string, shareWith: string): Promise<any>;
    createProduct(product: createProductDto, jwtToken: string): Promise<any>;
}
