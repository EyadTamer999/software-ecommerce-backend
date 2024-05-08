/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

 
@Injectable()
export class UserGatewayService {
    constructor(@Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka) {

        this.kafkaClient.subscribeToResponseOf('view-address');

    } 

    async viewAddress(email: string): Promise<any> {
        console.log("email:", email);
        return this.kafkaClient.send('view-address', {email});
    }
 

}
