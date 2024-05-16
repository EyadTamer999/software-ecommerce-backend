/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderGatewayController } from './order-gateway.controller';
import { OrderGatewayService } from './order-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-order-gateway-consumer',
          },
        },
      },
    ]),

  ]
  ,
  controllers: [OrderGatewayController],
  providers: [OrderGatewayService]
})
export class OrderGatewayModule {}
