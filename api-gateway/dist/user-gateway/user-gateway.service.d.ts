import { ClientKafka } from '@nestjs/microservices';
export declare class UserGatewayService {
    private readonly kafkaClient;
    constructor(kafkaClient: ClientKafka);
    updateProfile(user: any, jwtToken: any): Promise<any>;
    viewAddress(email: string): Promise<any>;
    addAddress(data: {
        email: string;
        label: string;
        address: string;
    }): Promise<any>;
    deleteAddress(data: {
        email: string;
        id: string;
    }): Promise<any>;
}
