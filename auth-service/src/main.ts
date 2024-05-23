/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
  
async function bootstrap() {
  config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Kafka broker address
      },
      consumer: {
        groupId: 'auth-service-consumer',  // Kafka consumer group ID
      },
    },
  });
  
  await app.listen();
}
bootstrap();
