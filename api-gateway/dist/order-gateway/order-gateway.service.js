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
exports.OrderGatewayService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let OrderGatewayService = class OrderGatewayService {
    constructor(kafkaClient) {
        this.kafkaClient = kafkaClient;
        this.kafkaClient.subscribeToResponseOf('create_order');
        this.kafkaClient.subscribeToResponseOf('get_orders_history');
        this.kafkaClient.subscribeToResponseOf('get_order');
        this.kafkaClient.subscribeToResponseOf('cancel_order');
        this.kafkaClient.subscribeToResponseOf('get_order_queue');
        this.kafkaClient.subscribeToResponseOf('get_all_orders');
        this.kafkaClient.subscribeToResponseOf('update_order_status');
        this.kafkaClient.subscribeToResponseOf('update_order_status_closed');
    }
    async createOrder(createOrderDto, jwtToken) {
        return this.kafkaClient.send('create_order', { createOrderDto, jwtToken }).toPromise();
    }
    async getOrdersHistory(jwtToken) {
        console.log('jwtToken from api-gateway:', jwtToken);
        return this.kafkaClient.send('get_orders_history', { jwtToken }).toPromise();
    }
    async getOrder(id, jwtToken) {
        return this.kafkaClient.send('get_order', { id, jwtToken }).toPromise();
    }
    async cancelOrder(id, jwtToken) {
        return this.kafkaClient.send('cancel_order', { id, jwtToken }).toPromise();
    }
    async getOrderQueue(jwtToken) {
        return this.kafkaClient.send('get_order_queue', { jwtToken }).toPromise();
    }
    async getAllOrders(jwtToken) {
        return this.kafkaClient.send('get_all_orders', { jwtToken }).toPromise();
    }
    async updateOrderStatus(id, jwtToken) {
        return this.kafkaClient.send('update_order_status', { id, jwtToken }).toPromise();
    }
    async updateOrderStatusClosed(id, jwtToken) {
        return this.kafkaClient.send('update_order_status_closed', { id, jwtToken }).toPromise();
    }
};
exports.OrderGatewayService = OrderGatewayService;
exports.OrderGatewayService = OrderGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ORDER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], OrderGatewayService);
//# sourceMappingURL=order-gateway.service.js.map