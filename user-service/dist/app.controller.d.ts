import { AppService } from './app.service';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UpdateUserDTO } from './DTO/updateuser.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    viewAddress(data: {
        email: string;
    }): Promise<any>;
    updateProfile(payload: {
        jwtToken: string;
        user: UpdateUserDTO;
    }, req: any): Promise<any>;
    findByEmail(email: string): Promise<any>;
    addAddress(data: {
        email: string;
        label: string;
        address: string;
    }): Promise<any>;
    deleteAddress(data: {
        email: string;
        id: string;
    }): Promise<any>;
    createUser(data: CreateUserDTO): Promise<any>;
    getUserEmailLinkToken(token: string): Promise<any>;
    updateUser(user: CreateUserDTO): Promise<any>;
    getAllAdmins(): Promise<any>;
}
