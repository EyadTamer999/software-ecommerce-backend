/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserGatewayModule } from './user-gateway/user-gateway.module';
import { AuthGatewayModule } from './auth-gateway/auth-gateway.module';
import { OrderGatewayModule } from './order-gateway/order-gateway.module';
<<<<<<< HEAD
=======
import { ProductGatewayModule } from './product-gateway/product-gateway.module';
>>>>>>> e4cc43b3 (Initial)

@Module({
  imports: [
    
    UserGatewayModule,
    
    AuthGatewayModule,
    
    OrderGatewayModule,
<<<<<<< HEAD
=======
    
    ProductGatewayModule,
>>>>>>> e4cc43b3 (Initial)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
