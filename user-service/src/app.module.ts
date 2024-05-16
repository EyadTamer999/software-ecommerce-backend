/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { userProviders } from './Database/user.providers';
import { databaseProviders } from './Database/database.providers';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { KafkaInterceptor } from './guards/kafka-Interceptor'
import * as dotenv from 'dotenv';

dotenv.config();
// import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    //MongooseModule.forRoot('mongodb+srv://abooof:abooof@cluster0.bkizkft.mongodb.net/'),
    
    JwtModule.register({
      global: true,
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService,JwtAuthGuard ,KafkaInterceptor , ...userProviders , ...databaseProviders],
})
export class AppModule {}
