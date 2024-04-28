/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserGatewayService {
    constructor(@Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('user_register');
    }

    //this.kafkaClient.subscribeToResponseOf('user_register');

    async registerUser(user: any): Promise<any> {
        return this.kafkaClient.send('user_register', user).toPromise();
    }
}
