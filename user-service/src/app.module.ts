/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { userProviders } from './Database/user.providers';
import { databaseProviders } from './Database/database.providers';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb+srv://abooof:abooof@cluster0.bkizkft.mongodb.net/'),
  ],
  controllers: [AppController],
  providers: [AppService , ...userProviders , ...databaseProviders],
})
export class AppModule {}
