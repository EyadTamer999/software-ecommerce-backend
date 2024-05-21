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
const user_providers_1 = require("./Database/user.providers");
const database_providers_1 = require("./Database/database.providers");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const kafka_Interceptor_1 = require("./guards/kafka-Interceptor");
const dotenv = require("dotenv");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secretOrPrivateKey: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_auth_guard_1.JwtAuthGuard, kafka_Interceptor_1.KafkaInterceptor, ...user_providers_1.userProviders, ...database_providers_1.databaseProviders],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map