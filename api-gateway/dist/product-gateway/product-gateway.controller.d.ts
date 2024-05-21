import { ProductGatewayService } from './product-gateway.service';
import { createProductDto } from './DTO/createProduct.dto';
export declare class ProductGatewayController {
    private readonly productGatewayService;
    constructor(productGatewayService: ProductGatewayService);
    getAllProducts(request: any): Promise<any>;
    getProduct(id: string, request: any): Promise<any>;
    deleteProduct(id: string, request: any): Promise<any>;
    addToCart(body: any): Promise<any>;
    customizeProduct(body: any): Promise<any>;
    addReview(body: any): Promise<any>;
    saveForLater(body: any): Promise<any>;
    shareProduct(body: any): Promise<any>;
    createProduct(product: createProductDto, request: any): Promise<any>;
}
