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
exports.UserGatewayController = void 0;
const common_1 = require("@nestjs/common");
const user_gateway_service_1 = require("./user-gateway.service");
const updateUser_dto_1 = require("./DTO/updateUser.dto");
let UserGatewayController = class UserGatewayController {
    constructor(userGatewayService) {
        this.userGatewayService = userGatewayService;
    }
    async updateProfile(user, request) {
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');
        return this.userGatewayService.updateProfile(user, jwtToken);
    }
    viewAddress(email) {
        console.log("email:", email);
        return this.userGatewayService.viewAddress(email);
    }
    addAddress(data) {
        if (data) {
            console.log("email:", data.email, "label:", data.label, "address:", data.address, "controller");
        }
        else {
            console.log('Data is undefined');
        }
        return this.userGatewayService.addAddress(data);
    }
    deleteAddress(data) {
        if (data) {
            console.log("email:", data.email, "id:", data.id, "controller");
        }
        else {
            console.log('Data is undefined');
        }
        return this.userGatewayService.deleteAddress(data);
    }
};
exports.UserGatewayController = UserGatewayController;
__decorate([
    (0, common_1.Put)('update-profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.UpdateUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserGatewayController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)("view-address"),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserGatewayController.prototype, "viewAddress", null);
__decorate([
    (0, common_1.Post)('add-address'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserGatewayController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Delete)('delete-address'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserGatewayController.prototype, "deleteAddress", null);
exports.UserGatewayController = UserGatewayController = __decorate([
    (0, common_1.Controller)('Users'),
    __metadata("design:paramtypes", [user_gateway_service_1.UserGatewayService])
], UserGatewayController);
//# sourceMappingURL=user-gateway.controller.js.map