/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './Database/database.provider';
import { orderProviders } from './Database/order.provider';
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {KafkaInterceptor} from './guards/kafka-Interceptor'
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { settingsProviders } from './Database/settings.provider';


dotenv.config();
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
            groupId: 'order-user-service-consumer',//user-service-consumer
          },
        },
      },
    ]),
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService,JwtAuthGuard, KafkaInterceptor,...databaseProviders, ...orderProviders , ...settingsProviders],
})
export class AppModule {}
