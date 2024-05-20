/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
 

@Injectable()
export class ProductGatewayService {
    constructor(@Inject('ORDER_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('create_order');
        this.kafkaClient.subscribeToResponseOf('get_orders_history');
        this.kafkaClient.subscribeToResponseOf('get_order');
        this.kafkaClient.subscribeToResponseOf('cancel_order');
        this.kafkaClient.subscribeToResponseOf('get_order_queue');
        this.kafkaClient.subscribeToResponseOf('get_all_orders');
        this.kafkaClient.subscribeToResponseOf('update_order_status');
        this.kafkaClient.subscribeToResponseOf('update_order_status_closed');
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


    //admin-----------------------
    async getOrderQueue(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_order_queue', {jwtToken}).toPromise();
    }

    async getAllOrders(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_all_orders', {jwtToken}).toPromise();
    }

    async updateOrderStatus(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('update_order_status', { id,jwtToken}).toPromise();
    }

    async updateOrderStatusClosed(id :string,jwtToken: any): Promise<any> {
        return this.kafkaClient.send('update_order_status_closed', { id,jwtToken}).toPromise();
    }
}
