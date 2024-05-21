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
exports.AuthGatewayService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let AuthGatewayService = class AuthGatewayService {
    constructor(kafkaClient) {
        this.kafkaClient = kafkaClient;
        this.kafkaClient.subscribeToResponseOf('verify_user_register');
        this.kafkaClient.subscribeToResponseOf('verify_email');
        this.kafkaClient.subscribeToResponseOf('resend_email');
        this.kafkaClient.subscribeToResponseOf('login_user');
    }
    async verifyRegisterUser(user) {
        return this.kafkaClient.send('verify_user_register', user).toPromise();
    }
    async resendEmail(email) {
        console.log('resend email service :', email);
        return this.kafkaClient.send('resend_email', email).toPromise();
    }
    async verifyEmail(token) {
        return this.kafkaClient.send('verify_email', { token });
    }
    async loginUser(user) {
        return this.kafkaClient.send('login_user', user).toPromise();
    }
};
exports.AuthGatewayService = AuthGatewayService;
exports.AuthGatewayService = AuthGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], AuthGatewayService);
//# sourceMappingURL=auth-gateway.service.js.map