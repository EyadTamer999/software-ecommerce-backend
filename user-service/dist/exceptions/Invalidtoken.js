"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidToken = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
class InvalidToken extends microservices_1.RpcException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            message: 'Invalid token',
        });
    }
}
exports.InvalidToken = InvalidToken;
//# sourceMappingURL=Invalidtoken.js.map