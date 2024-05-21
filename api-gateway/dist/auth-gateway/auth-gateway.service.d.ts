import { ClientKafka } from '@nestjs/microservices';
export declare class AuthGatewayService {
    private readonly kafkaClient;
    constructor(kafkaClient: ClientKafka);
    verifyRegisterUser(user: any): Promise<any>;
    resendEmail(email: string): Promise<any>;
    verifyEmail(token: string): Promise<any>;
    loginUser(user: any): Promise<any>;
}
