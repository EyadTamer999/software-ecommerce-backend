import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductService } from './app.service';
import { databaseProviders } from './Database/database.provider';
import { ProductProviders } from './Database/product.provider';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule'; // Add this line

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
            groupId: 'product-user-service-consumer', //product-service-consumer
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
  providers: [
    ProductService,
    JwtAuthGuard,
    KafkaInterceptor,
    ...databaseProviders,
    ...ProductProviders,
  ],
})
export class AppModule {}