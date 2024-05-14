/* eslint-disable prettier/prettier */
import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class UNAUTHORIZED extends RpcException {
    constructor() {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized access',
        });
    }
}