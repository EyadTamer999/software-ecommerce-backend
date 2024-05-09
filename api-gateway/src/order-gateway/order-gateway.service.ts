/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Injectable()
export class OrderGatewayService {
    constructor(@Inject('ORDER_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('create_order');
        this.kafkaClient.subscribeToResponseOf('get_orders_history');
        this.kafkaClient.subscribeToResponseOf('get_order');
        this.kafkaClient.subscribeToResponseOf('cancel_order');
    }


    async createOrder(createOrderDto: any , jwtToken : any): Promise<any> {
        return this.kafkaClient.send('create_order', {createOrderDto ,jwtToken}).toPromise();
    }

    async getOrdersHistory(jwtToken: any): Promise<any> {
        console.log('jwtToken from api-gateway:', jwtToken);
        return this.kafkaClient.send('get_orders_history', {jwtToken}).toPromise();
    }

    async getOrder(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_order', { id,jwtToken}).toPromise();
    }

    async cancelOrder(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('cancel_order', { id,jwtToken}).toPromise();
    }
}
