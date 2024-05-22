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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const createUser_dto_1 = require("./DTO/createUser.dto");
const kafka_Interceptor_1 = require("./guards/kafka-Interceptor");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async viewAddress(data) {
        console.log("email:", data.email);
        return this.appService.viewAddress(data.email);
    }
    async updateProfile(payload, req) {
        const { jwtToken, user } = payload;
        return this.appService.updateProfile(user, jwtToken);
    }
    async findByEmail(email) {
        console.log("from controller login:", email);
        return this.appService.findByEmail(email);
    }
    async addAddress(data) {
        const payload = data.address[0];
        const label = payload['label'];
        const address = payload['address'];
        console.log("payload:", payload, "type:", typeof payload, "controller");
        console.log("email:", data.email, "label:", label, "address:", address, "controller");
        return this.appService.addAddress(data.email, label, address);
    }
    async deleteAddress(data) {
        console.log("email:", data.email, "id:", data.id, "controller");
        return this.appService.deleteAddress(data.email, data.id);
    }
    async createUser(data) {
        return this.appService.createUser(data);
    }
    async getUserEmailLinkToken(token) {
        return this.appService.getUserEmailLinkToken(token);
    }
    async updateUser(user) {
        return this.appService.updateUser(user);
    }
    async getAllAdmins() {
        return this.appService.getAllAdmins();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.MessagePattern)('view-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "viewAddress", null);
__decorate([
    (0, microservices_1.MessagePattern)('update_profile'),
    (0, common_1.UseInterceptors)(kafka_Interceptor_1.KafkaInterceptor),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)('user_findByEmail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)('add-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addAddress", null);
__decorate([
    (0, microservices_1.MessagePattern)('delete-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteAddress", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('GetUser-Email-link-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUserEmailLinkToken", null);
__decorate([
    (0, microservices_1.MessagePattern)('update-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('Get-all-Admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllAdmins", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map