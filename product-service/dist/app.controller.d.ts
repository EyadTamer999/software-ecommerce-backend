import { ProductService } from './app.service';
import { createProductDto } from './DTO/createProduct.dto';
export declare class AppController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(jwtToken: string): Promise<any>;
    getProduct(payload: {
        id: string;
        jwtToken: string;
    }): Promise<any>;
    deleteProduct(payload: {
        id: string;
        jwtToken: string;
    }): Promise<any>;
    addToCart(data: {
        userId: string;
        productId: string;
    }): Promise<any>;
    customizeProduct(data: {
        productId: string;
        customizationOptions: any;
    }): Promise<any>;
    addReview(data: {
        userId: string;
        productId: string;
        review: any;
    }): Promise<any>;
    saveForLater(data: {
        userId: string;
        productId: string;
    }): Promise<any>;
    shareProduct(data: {
        userId: string;
        productId: string;
        platform: string;
    }): Promise<any>;
    createProduct(data: {
        product: createProductDto;
        jwtToken: string;
    }): Promise<any>;
}
