/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PayMobCreateOrderDTO } from './DTO/payment-order.dto';
import { PayMobPaymentKeyDTO } from './DTO/payment-key.dto';

@Injectable()
export class PaymentPaymobGatewayService {
    
    private readonly logger = new Logger(PaymentPaymobGatewayService.name);
    
    
    constructor(@Inject('PAYMENT_PAYMOB_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('paymob_auth');
        this.kafkaClient.subscribeToResponseOf('paymob_order');
        this.kafkaClient.subscribeToResponseOf('paymob_payment_key')
    }
    
    async paymMobAuth(): Promise<any> {
        return this.kafkaClient.send('paymob_auth', {});
    }
    
    async paymMobOrder(order: PayMobCreateOrderDTO): Promise<any> {
        return this.kafkaClient.send('paymob_order', order);
    }
    
    payMobPaymentKey(payment_info: PayMobCreateOrderDTO): any {
        return this.kafkaClient.send('paymob_payment_key', payment_info);
    }
    
}
