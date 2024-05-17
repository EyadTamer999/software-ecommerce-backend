/* eslint-disable prettier/prettier */
import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class NotVerified extends RpcException {
    constructor() {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'User not verified',
        });
    }
}