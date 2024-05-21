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
exports.ProductGatewayController = void 0;
const common_1 = require("@nestjs/common");
const product_gateway_service_1 = require("./product-gateway.service");
const createProduct_dto_1 = require("./DTO/createProduct.dto");
let ProductGatewayController = class ProductGatewayController {
    constructor(productGatewayService) {
        this.productGatewayService = productGatewayService;
    }
    async getAllProducts(request) {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.getAllProducts(jwtToken);
    }
    async getProduct(id, request) {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.getProduct(id, jwtToken);
    }
    async deleteProduct(id, request) {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.deleteProduct(id, jwtToken);
    }
    async addToCart(body) {
        const { userId, productId } = body;
        return this.productGatewayService.addToCart(userId, productId);
    }
    async customizeProduct(body) {
        const { productId, customizationOptions } = body;
        return this.productGatewayService.customizeProduct(productId, customizationOptions);
    }
    async addReview(body) {
        const { userId, productId, review } = body;
        return this.productGatewayService.addReview(userId, productId, review);
    }
    async saveForLater(body) {
        const { userId, productId } = body;
        return this.productGatewayService.saveForLater(userId, productId);
    }
    async shareProduct(body) {
        const { userId, productId, shareWith } = body;
        return this.productGatewayService.shareProduct(userId, productId, shareWith);
    }
    async createProduct(product, request) {
        const jwtToken = request.headers.authorization;
        return this.productGatewayService.createProduct(product, jwtToken);
    }
};
exports.ProductGatewayController = ProductGatewayController;
__decorate([
    (0, common_1.Get)('getAllProducts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('getProduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Delete)('deletProduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Post)('addToCart'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Post)('customizeProduct'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "customizeProduct", null);
__decorate([
    (0, common_1.Post)('addReview'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "addReview", null);
__decorate([
    (0, common_1.Post)('saveForLater'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "saveForLater", null);
__decorate([
    (0, common_1.Post)('shareProduct'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "shareProduct", null);
__decorate([
    (0, common_1.Post)('createProduct'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.createProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductGatewayController.prototype, "createProduct", null);
exports.ProductGatewayController = ProductGatewayController = __decorate([
    (0, common_1.Controller)('product-gateway'),
    __metadata("design:paramtypes", [product_gateway_service_1.ProductGatewayService])
], ProductGatewayController);
//# sourceMappingURL=product-gateway.controller.js.map