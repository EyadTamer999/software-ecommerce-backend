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
exports.OrderGatewayController = void 0;
const common_1 = require("@nestjs/common");
const order_gateway_service_1 = require("./order-gateway.service");
const createOrder_dto_1 = require("./DTO/createOrder.dto");
let OrderGatewayController = class OrderGatewayController {
    constructor(orderGatewayService) {
        this.orderGatewayService = orderGatewayService;
    }
    async createOrder(createOrderDto, request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        console.log('createOrderDto from api-agteway: ', createOrderDto);
        return this.orderGatewayService.createOrder(createOrderDto, jwtToken);
    }
    async getOrdersHistory(request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getOrdersHistory(jwtToken);
    }
    async getOrder(id, request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getOrder(id, jwtToken);
    }
    async cancelOrder(id, request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.cancelOrder(id, jwtToken);
    }
    async getOrderQueue(request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getOrderQueue(jwtToken);
    }
    async getAllOrders(request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.getAllOrders(jwtToken);
    }
    async updateOrderStatus(id, request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.updateOrderStatus(id, jwtToken);
    }
    async updateOrderStatusClosed(id, request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.orderGatewayService.updateOrderStatusClosed(id, jwtToken);
    }
};
exports.OrderGatewayController = OrderGatewayController;
__decorate([
    (0, common_1.Post)('create-order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrder_dto_1.CreateOrderDTO, Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('get-orders-history'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "getOrdersHistory", null);
__decorate([
    (0, common_1.Get)('get-order/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Delete)('cancel-order/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Get)('get-order-queue'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "getOrderQueue", null);
__decorate([
    (0, common_1.Get)('all-orders-admin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Put)('update-order-status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Put)('update-order-status-closed/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderGatewayController.prototype, "updateOrderStatusClosed", null);
exports.OrderGatewayController = OrderGatewayController = __decorate([
    (0, common_1.Controller)('order-gateway'),
    __metadata("design:paramtypes", [order_gateway_service_1.OrderGatewayService])
], OrderGatewayController);
//# sourceMappingURL=order-gateway.controller.js.map