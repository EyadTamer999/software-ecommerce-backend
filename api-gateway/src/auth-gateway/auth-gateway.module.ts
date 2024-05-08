/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { AuthGatewayController } from './auth-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({

  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-gateway-consumer', 
          },
        },
      },
    ]),
  ],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
