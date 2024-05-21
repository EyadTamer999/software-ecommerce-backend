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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const createUser_dto_1 = require("./DTO/createUser.dto");
const loginUser_dto_1 = require("./DTO/loginUser.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async registerUser(user) {
        console.log('ana wslt ll auth-service: ', user);
        return this.appService.verifyRegister(user);
    }
    async verifyEmail(data) {
        console.log('Received email verification request:', data);
        return this.appService.verifyEmail(data.token);
    }
    async resendEmail(email) {
        console.log('Received resend email request:', email);
        return this.appService.resendEmail(email);
    }
    async login(user) {
        return this.appService.loginUser(user);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)('verify_user_register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "registerUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('verify_email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)('resend_email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "resendEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)('login_user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map