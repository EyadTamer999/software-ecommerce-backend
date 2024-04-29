/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Injectable()
export class AuthGatewayService {
    constructor(@Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('verify_user_register');
    }


    
    async verifyRegisterUser(user: any): Promise<any> {
        console.log('ana fe auth-gateway.......');
        return this.kafkaClient.send('verify_user_register', user).toPromise();
    }
}
