import { AppService } from './app.service';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LoginUserDTO } from './DTO/loginUser.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    registerUser(user: CreateUserDTO): Promise<any>;
    verifyEmail(data: {
        token: string;
    }): Promise<any>;
    resendEmail(email: string): Promise<any>;
    login(user: LoginUserDTO): Promise<any>;
}
