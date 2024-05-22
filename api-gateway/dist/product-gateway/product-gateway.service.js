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
exports.ProductGatewayService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ProductGatewayService = class ProductGatewayService {
    constructor(kafkaClient) {
        this.kafkaClient = kafkaClient;
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
    async getAllProducts(jwtToken) {
        return this.kafkaClient.send('getAllProducts', { jwtToken }).toPromise();
    }
    async getProduct(id, jwtToken) {
        return this.kafkaClient.send('getProduct', { id, jwtToken }).toPromise();
    }
    async deleteProduct(id, jwtToken) {
        return this.kafkaClient.send('deleteProduct', { id, jwtToken }).toPromise();
    }
    async addToCart(userId, productId) {
        return this.kafkaClient.send('addToCart', { userId, productId }).toPromise();
    }
    async customizeProduct(productId, customizationOptions) {
        return this.kafkaClient.send('customizeProduct', { productId, customizationOptions }).toPromise();
    }
    async addReview(userId, productId, review) {
        return this.kafkaClient.send('addReview', { userId, productId, review }).toPromise();
    }
    async saveForLater(userId, productId) {
        return this.kafkaClient.send('saveForLater', { userId, productId }).toPromise();
    }
    async shareProduct(userId, productId, shareWith) {
        return this.kafkaClient.send('shareProduct', { userId, productId, shareWith }).toPromise();
    }
    async createProduct(product, jwtToken) {
        return this.kafkaClient.send('createProduct', { product, jwtToken }).toPromise();
    }
};
exports.ProductGatewayService = ProductGatewayService;
exports.ProductGatewayService = ProductGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], ProductGatewayService);
//# sourceMappingURL=product-gateway.service.js.map