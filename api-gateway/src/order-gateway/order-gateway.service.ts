/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
<<<<<<< HEAD
import { CreateDeliveryFeeDTO } from './DTO/createDeliveryFee.Dto';
import { PromoCodeDto } from './DTO/PromoCode.Dto';
=======
>>>>>>> e4cc43b3 (Initial)
 

@Injectable()
export class OrderGatewayService {
    constructor(@Inject('ORDER_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('create_order');
        this.kafkaClient.subscribeToResponseOf('get_orders_history');
        this.kafkaClient.subscribeToResponseOf('get_order');
        this.kafkaClient.subscribeToResponseOf('cancel_order');
        this.kafkaClient.subscribeToResponseOf('get_order_queue');
        this.kafkaClient.subscribeToResponseOf('get_all_orders');
        this.kafkaClient.subscribeToResponseOf('update_order_status');
        this.kafkaClient.subscribeToResponseOf('update_order_status_closed');
<<<<<<< HEAD
        this.kafkaClient.subscribeToResponseOf('add_delivery_fee');
        this.kafkaClient.subscribeToResponseOf('delete_delivery_fee');
        this.kafkaClient.subscribeToResponseOf('get_delivery_fee');
        this.kafkaClient.subscribeToResponseOf('add_promo_code');
    }
 
=======
    }

>>>>>>> e4cc43b3 (Initial)

    async createOrder(createOrderDto: any , jwtToken : any): Promise<any> {
        return this.kafkaClient.send('create_order', {createOrderDto ,jwtToken}).toPromise();
    }

    async getOrdersHistory(jwtToken: any): Promise<any> {
        console.log('jwtToken from api-gateway:', jwtToken);
        return this.kafkaClient.send('get_orders_history', {jwtToken}).toPromise();
    }
<<<<<<< HEAD
 
=======

>>>>>>> e4cc43b3 (Initial)
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
<<<<<<< HEAD


    async addDeliveryFee(createDeliveryFeeDTO: CreateDeliveryFeeDTO , jwtToken:string): Promise<any> {
        console.log('createDeliveryFeeDTO from api-gateway from api gateway : ', createDeliveryFeeDTO);
        return this.kafkaClient.send('add_delivery_fee', { createDeliveryFeeDTO ,jwtToken }).toPromise();
    }

    async deleteDeliveryFee(id :string,jwtToken: any): Promise<any> {
        console.log('id from api-gateway from api gateway : ', id);
        return this.kafkaClient.send('delete_delivery_fee', { id,jwtToken}).toPromise();
    }

    async getAllDeliveryFees(jwtToken: any): Promise<any> {
        return this.kafkaClient.send('get_delivery_fee', {jwtToken}).toPromise();
    }

    async addPromoCode(createPromoCodeDTO: PromoCodeDto , jwtToken:string): Promise<any> {
        return this.kafkaClient.send('add_promo_code', { createPromoCodeDTO ,jwtToken }).toPromise();
    }
=======
>>>>>>> e4cc43b3 (Initial)
}
