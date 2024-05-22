/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { Product } from './interfaces/product.interface';
import { createProductDto } from './DTO/createProduct.dto';
export declare class ProductService {
    private clientKafka;
    private productModel;
    constructor(clientKafka: ClientKafka, productModel: Model<Product>);
    getAllProducts(JwtToken: string): Promise<any>;
    getProduct(id: string, jwtToken: string): Promise<any>;
    deleteProduct(id: string, jwtToken: string): Promise<any>;
    addToCart(userId: string, productId: string): Promise<void>;
    customizeProduct(productId: string, customizationOptions: any): Promise<Product>;
    addReview(userId: string, productId: string, review: any): Promise<Product>;
    saveForLater(userId: string, productId: string): Promise<void>;
    shareProduct(userId: string, productId: string, platform: string): Promise<void>;
    createProduct(product: createProductDto, jwtToken: string): Promise<any>;
}
