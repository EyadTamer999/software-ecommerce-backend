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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const kafka_Interceptor_1 = require("./guards/kafka-Interceptor");
const microservices_1 = require("@nestjs/microservices");
let AppController = class AppController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts(jwtToken) {
        const JwtToken = jwtToken['jwtToken'];
        return await this.productService.getAllProducts(JwtToken);
    }
    async getProduct(payload) {
        const { id, jwtToken } = payload;
        return await this.productService.getProduct(id, jwtToken);
    }
    async deleteProduct(payload) {
        const { id, jwtToken } = payload;
        return await this.productService.deleteProduct(id, jwtToken);
    }
    async addToCart(data) {
        await this.productService.addToCart(data.userId, data.productId);
    }
    async customizeProduct(data) {
        return await this.productService.customizeProduct(data.productId, data.customizationOptions);
    }
    async addReview(data) {
        return await this.productService.addReview(data.userId, data.productId, data.review);
    }
    async saveForLater(data) {
        await this.productService.saveForLater(data.userId, data.productId);
    }
    async shareProduct(data) {
        await this.productService.shareProduct(data.userId, data.productId, data.platform);
    }
    async createProduct(data) {
        const { product, jwtToken } = data;
        return await this.productService.createProduct(product, jwtToken);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)('getAllProducts'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllProducts", null);
__decorate([
    (0, microservices_1.MessagePattern)('getProduct'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)('deletProduct'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)('addToCart'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addToCart", null);
__decorate([
    (0, microservices_1.MessagePattern)('customizeProduct'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "customizeProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)('addReview'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addReview", null);
__decorate([
    (0, microservices_1.MessagePattern)('saveForLater'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "saveForLater", null);
__decorate([
    (0, microservices_1.MessagePattern)('shareProduct'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "shareProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)('createProduct'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createProduct", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [app_service_1.ProductService])
], AppController);
//# sourceMappingURL=app.controller.js.map