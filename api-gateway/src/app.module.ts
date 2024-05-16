/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserGatewayModule } from './user-gateway/user-gateway.module';
import { AuthGatewayModule } from './auth-gateway/auth-gateway.module';
import { OrderGatewayModule } from './order-gateway/order-gateway.module';
import { ProductGatewayModule } from './product-gateway/product-gateway.module';

@Module({
  imports: [
    
    UserGatewayModule,
    
    AuthGatewayModule,
    
    OrderGatewayModule,
    
    ProductGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
