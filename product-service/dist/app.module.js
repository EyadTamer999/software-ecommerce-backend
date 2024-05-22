"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_provider_1 = require("./Database/database.provider");
const product_provider_1 = require("./Database/product.provider");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const kafka_Interceptor_1 = require("./guards/kafka-Interceptor");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const microservices_1 = require("@nestjs/microservices");
const schedule_1 = require("@nestjs/schedule");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
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
                            groupId: 'product-service-consumer',
                        },
                    },
                },
            ]),
            schedule_1.ScheduleModule.forRoot(),
            jwt_1.JwtModule.register({
                global: true,
                secretOrPrivateKey: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.ProductService,
            jwt_auth_guard_1.JwtAuthGuard,
            kafka_Interceptor_1.KafkaInterceptor,
            ...database_provider_1.databaseProviders,
            ...product_provider_1.ProductProviders,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map