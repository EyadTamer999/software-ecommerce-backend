"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const product_gateway_controller_1 = require("./product-gateway.controller");
const product_gateway_service_1 = require("./product-gateway.service");
const microservices_1 = require("@nestjs/microservices");
let ProductGatewayModule = class ProductGatewayModule {
};
exports.ProductGatewayModule = ProductGatewayModule;
exports.ProductGatewayModule = ProductGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'PRODUCT_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'api-product-gateway-consumer',
                        },
                    },
                },
            ]),
        ],
        controllers: [product_gateway_controller_1.ProductGatewayController],
        providers: [product_gateway_service_1.ProductGatewayService]
    })
], ProductGatewayModule);
//# sourceMappingURL=product-gateway.module.js.map