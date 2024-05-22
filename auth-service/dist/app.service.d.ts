import { CreateUserDTO } from './DTO/createUser.dto';
import { ClientKafka } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginUserDTO } from './DTO/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private userClient;
    private readonly mailerService;
    private jwtService;
    constructor(userClient: ClientKafka, mailerService: MailerService, jwtService: JwtService);
    private sendMail;
    verifyRegister(user: CreateUserDTO): Promise<any>;
    verifyEmail(token: string): Promise<any>;
    resendEmail(email: string): Promise<any>;
    loginUser(loginDTO: LoginUserDTO): Promise<{
        access_token: string;
    }>;
    validateToken(accessToken: string): Promise<any>;
}
