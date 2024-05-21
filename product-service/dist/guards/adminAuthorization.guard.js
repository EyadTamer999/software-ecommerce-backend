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
exports.AdminAuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const Authorization_1 = require("../exceptions/Authorization");
const Invalidtoken_1 = require("../exceptions/Invalidtoken");
let AdminAuthorizationGuard = class AdminAuthorizationGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const payload = this.extractPayload(context);
        if (!payload) {
            return new Invalidtoken_1.InvalidToken();
        }
        const user = await this.jwtService.decode(payload.jwtToken);
        if (!user) {
            throw new Invalidtoken_1.InvalidToken();
        }
        if (user.role === 'admin') {
            return true;
        }
        else {
            throw new Authorization_1.UNAUTHORIZED();
        }
    }
    extractPayload(context) {
        const kafkaContext = context.switchToRpc();
        const payload = kafkaContext.getData();
        return payload ? { jwtToken: payload.jwtToken } : null;
    }
};
exports.AdminAuthorizationGuard = AdminAuthorizationGuard;
exports.AdminAuthorizationGuard = AdminAuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AdminAuthorizationGuard);
//# sourceMappingURL=adminAuthorization.guard.js.map