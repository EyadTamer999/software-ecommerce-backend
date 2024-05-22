"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNAUTHORIZED = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
class UNAUTHORIZED extends microservices_1.RpcException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized access',
        });
    }
}
exports.UNAUTHORIZED = UNAUTHORIZED;
//# sourceMappingURL=Authorization.js.map