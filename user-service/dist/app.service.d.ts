/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { User } from './interfaces/user';
import { CreateUserDTO } from './DTO/createUser.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    getHello(): string;
    private getUserByToken;
    updateProfile(data: any, jwtToken: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    viewAddress(email: string): Promise<any>;
    addAddress(email: string, label: string, address: string): Promise<any>;
    deleteAddress(email: string, id: string): Promise<any>;
    createUser(data: CreateUserDTO): Promise<any>;
    getUserEmailLinkToken(token: string): Promise<any>;
    updateUser(data: CreateUserDTO): Promise<any>;
    getAllAdmins(): Promise<any>;
}
