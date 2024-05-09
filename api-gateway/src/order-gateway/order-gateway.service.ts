/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Injectable()
export class OrderGatewayService {
    constructor(@Inject('ORDER_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('create_order');
    }


    async createOrder(createOrderDto: any , jwtToken : any): Promise<any> {
        return this.kafkaClient.send('create_order', {createOrderDto ,jwtToken}).toPromise();
    }
}
