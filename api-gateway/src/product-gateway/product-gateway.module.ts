/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductGatewayController } from './product-gateway.controller';
import { ProductGatewayService } from './product-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-product-gateway-consumer',
          },
        },
      },
    ]),

  ]
  ,
  controllers: [ProductGatewayController],
  providers: [ProductGatewayService]
})
export class OrderGatewayModule {}
