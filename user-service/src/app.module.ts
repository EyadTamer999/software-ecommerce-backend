/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { userProviders } from './Database/user.providers';
import { databaseProviders } from './Database/database.providers';
// import { AuthModule } from '../../auth-service/src/app.module'


@Module({
  imports: [
    //MongooseModule.forRoot('mongodb+srv://abooof:abooof@cluster0.bkizkft.mongodb.net/'),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService , ...userProviders , ...databaseProviders],
})
export class AppModule {}
