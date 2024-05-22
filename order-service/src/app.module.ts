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
import { deliveryProviders } from './Database/delivery.provider';
import { PromoCodeProvider } from './Database/PromoCode.provider';
import { MailerModule } from '@nestjs-modules/mailer';


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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService,JwtAuthGuard, KafkaInterceptor,...databaseProviders, ...orderProviders , ...settingsProviders ,...deliveryProviders, ...PromoCodeProvider],
})
export class AppModule {}
