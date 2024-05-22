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
exports.AuthGatewayController = void 0;
const common_1 = require("@nestjs/common");
const auth_gateway_service_1 = require("./auth-gateway.service");
const Create_User_dto_1 = require("./DTO/Create-User.dto");
const logindto_dto_1 = require("./DTO/logindto.dto");
let AuthGatewayController = class AuthGatewayController {
    constructor(authGatewayService) {
        this.authGatewayService = authGatewayService;
    }
    async registerUser(user) {
        return this.authGatewayService.verifyRegisterUser(user);
    }
    async verifyEmail(token) {
        return this.authGatewayService.verifyEmail(token);
    }
    async resendEmail(email) {
        console.log('resend email controller :', email);
        return this.authGatewayService.resendEmail(email);
    }
    async login(user) {
        return this.authGatewayService.loginUser(user);
    }
};
exports.AuthGatewayController = AuthGatewayController;
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Create_User_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Get)('resend-email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "resendEmail", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logindto_dto_1.LoginUserDTO]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "login", null);
exports.AuthGatewayController = AuthGatewayController = __decorate([
    (0, common_1.Controller)('auth-gateway'),
    __metadata("design:paramtypes", [auth_gateway_service_1.AuthGatewayService])
], AuthGatewayController);
//# sourceMappingURL=auth-gateway.controller.js.map