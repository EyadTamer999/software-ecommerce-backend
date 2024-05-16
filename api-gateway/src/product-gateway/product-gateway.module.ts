import { Module } from '@nestjs/common';
import { ProductGatewayController } from './product-gateway.controller';
import { ProductGatewayService } from './product-gateway.service';

@Module({
  controllers: [ProductGatewayController],
  providers: [ProductGatewayService]
})
export class ProductGatewayModule {}
