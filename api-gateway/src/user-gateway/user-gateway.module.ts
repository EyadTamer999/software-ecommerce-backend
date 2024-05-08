/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { UserGatewayController } from './user-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-gateway-consumer', 
          },
        },
      },
    ]),
  ],
  controllers: [UserGatewayController],
  providers: [UserGatewayService],
})
export class UserGatewayModule {}


