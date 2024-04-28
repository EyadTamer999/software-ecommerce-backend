/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserGatewayModule } from './user-gateway/user-gateway.module';
import { AuthGatewayModule } from './auth-gateway/auth-gateway.module';

@Module({
  imports: [
    
    UserGatewayModule,
    
    AuthGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
