"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const order_gateway_controller_1 = require("./order-gateway.controller");
const order_gateway_service_1 = require("./order-gateway.service");
const microservices_1 = require("@nestjs/microservices");
let OrderGatewayModule = class OrderGatewayModule {
};
exports.OrderGatewayModule = OrderGatewayModule;
exports.OrderGatewayModule = OrderGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'ORDER_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'api-order-gateway-consumer',
                        },
                    },
                },
            ]),
        ],
        controllers: [order_gateway_controller_1.OrderGatewayController],
        providers: [order_gateway_service_1.OrderGatewayService]
    })
], OrderGatewayModule);
//# sourceMappingURL=order-gateway.module.js.map