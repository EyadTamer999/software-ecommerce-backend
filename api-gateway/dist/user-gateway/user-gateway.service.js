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
exports.UserGatewayService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let UserGatewayService = class UserGatewayService {
    constructor(kafkaClient) {
        this.kafkaClient = kafkaClient;
        this.kafkaClient.subscribeToResponseOf('update_profile');
        this.kafkaClient.subscribeToResponseOf('view-address');
        this.kafkaClient.subscribeToResponseOf('add-address');
        this.kafkaClient.subscribeToResponseOf('delete-address');
    }
    async updateProfile(user, jwtToken) {
        console.log('jwtToken from api-gateway: ', jwtToken);
        console.log('user from api-gateway: ', user);
        return this.kafkaClient.send('update_profile', { jwtToken, user });
    }
    async viewAddress(email) {
        console.log("email:", email);
        return this.kafkaClient.send('view-address', { email });
    }
    async addAddress(data) {
        console.log("email:", data.email, "label:", data.label, "address:", data.address, "service");
        return this.kafkaClient.send('add-address', data);
    }
    async deleteAddress(data) {
        console.log("email:", data.email, "id:", data.id, "service");
        return this.kafkaClient.send('delete-address', data);
    }
};
exports.UserGatewayService = UserGatewayService;
exports.UserGatewayService = UserGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], UserGatewayService);
//# sourceMappingURL=user-gateway.service.js.map