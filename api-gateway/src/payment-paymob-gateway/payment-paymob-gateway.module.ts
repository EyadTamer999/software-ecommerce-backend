import { Module } from '@nestjs/common';
import { PaymentPaymobGatewayController } from './payment-paymob-gateway.controller';
import { PaymentPaymobGatewayService } from './payment-paymob-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_PAYMOB_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-payment-paymob-gateway-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PaymentPaymobGatewayController],
  providers: [PaymentPaymobGatewayService],
})
export class PaymentPaymobGatewayModule {}
