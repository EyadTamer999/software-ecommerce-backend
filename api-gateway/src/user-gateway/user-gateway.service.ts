/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


 
@Injectable()
export class UserGatewayService {
    constructor(@Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka) {

        this.kafkaClient.subscribeToResponseOf('update_profile');
    } 
    async updateProfile(user: any): Promise<any> {
        return this.kafkaClient.send('update_profile', user);
    }

   

}
