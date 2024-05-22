"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
let ProductService = class ProductService {
    constructor(clientKafka, productModel) {
        this.clientKafka = clientKafka;
        this.productModel = productModel;
        this.clientKafka.subscribeToResponseOf('addToCart');
        this.clientKafka.subscribeToResponseOf('customizeProduct');
        this.clientKafka.subscribeToResponseOf('addReview');
        this.clientKafka.subscribeToResponseOf('saveForLater');
        this.clientKafka.subscribeToResponseOf('shareProduct');
        this.clientKafka.subscribeToResponseOf('getAllProducts');
        this.clientKafka.subscribeToResponseOf('getProduct');
        this.clientKafka.subscribeToResponseOf('deletProduct');
        this.clientKafka.subscribeToResponseOf('createProduct');
    }
    async getAllProducts(JwtToken) {
        const products = await this.productModel.find().exec();
        await this.clientKafka.emit('getAllProducts', `Here you are all products`);
        return { success: true, data: products };
    }
    async getProduct(id, jwtToken) {
        const product = await this.productModel.findOne({ _id: id }).exec();
        await this.clientKafka.emit('getProduct', `Here you are the product with id ${id}`);
        return { success: true, data: product };
    }
    async deleteProduct(id, jwtToken) {
        await this.productModel.findByIdAndDelete(id);
        await this.clientKafka.emit('deleteProduct', `Product with id ${id} has been deleted`);
        return { success: true, message: 'Product deleted successfully' };
    }
    async addToCart(userId, productId) {
        await this.clientKafka.emit('addToCart', `User ${userId} added product ${productId} to cart`);
    }
    async customizeProduct(productId, customizationOptions) {
        const product = await this.productModel.findOne({ _id: productId }).exec();
        product.customizationOptions = customizationOptions;
        await product.save();
        await this.clientKafka.emit('customizeProduct', `Product ${productId} has been customized with options: ${JSON.stringify(customizationOptions)}`);
        return product;
    }
    async addReview(userId, productId, review) {
        const product = await this.productModel.findOne({ _id: productId }).exec();
        product.reviews.push({ userId, ...review });
        await product.save();
        await this.clientKafka.emit('addReview', `User ${userId} added a review to product ${productId}`);
        return product;
    }
    async saveForLater(userId, productId) {
        await this.clientKafka.emit('saveForLater', `User ${userId} saved product ${productId} for later`);
    }
    async shareProduct(userId, productId, platform) {
        await this.clientKafka.emit('shareProduct', `User ${userId} shared product ${productId} on ${platform}`);
    }
    async createProduct(product, jwtToken) {
        const newProduct = new this.productModel(product);
        await newProduct.save();
        await this.clientKafka.emit('createProduct', `Product ${product.name} has been created`);
        return { success: true, data: newProduct };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __param(1, (0, common_1.Inject)('PRODUCT_MODEL')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka, mongoose_1.Model])
], ProductService);
//# sourceMappingURL=app.service.js.map