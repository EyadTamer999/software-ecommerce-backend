"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const user_gateway_service_1 = require("./user-gateway.service");
const user_gateway_controller_1 = require("./user-gateway.controller");
const microservices_1 = require("@nestjs/microservices");
let UserGatewayModule = class UserGatewayModule {
};
exports.UserGatewayModule = UserGatewayModule;
exports.UserGatewayModule = UserGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'api-user-gateway-consumer',
                        },
                    },
                },
            ]),
        ],
        controllers: [user_gateway_controller_1.UserGatewayController],
        providers: [user_gateway_service_1.UserGatewayService],
    })
], UserGatewayModule);
//# sourceMappingURL=user-gateway.module.js.map