import { AuthGatewayService } from './auth-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';
import { LoginUserDTO } from './DTO/logindto.dto';
export declare class AuthGatewayController {
    private readonly authGatewayService;
    constructor(authGatewayService: AuthGatewayService);
    registerUser(user: CreateUserDto): Promise<any>;
    verifyEmail(token: string): Promise<any>;
    resendEmail(email: string): Promise<any>;
    login(user: LoginUserDTO): Promise<any>;
}
