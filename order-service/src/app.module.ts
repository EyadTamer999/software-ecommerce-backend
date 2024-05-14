/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './Database/database.provider';
import { orderProviders } from './Database/order.provider';
import {userProviders} from './Database/user.providers'
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {KafkaInterceptor} from './guards/kafka-Interceptor'
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();
@Module({
  imports: [
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService,JwtAuthGuard, KafkaInterceptor,...databaseProviders, ...orderProviders , ...userProviders],
})
export class AppModule {}
