import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductService } from './app.service';
import { Product } from './interfaces/product.interface';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('findAll')
  @UseInterceptors(KafkaInterceptor)
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @MessagePattern('findOne')
  @UseInterceptors(KafkaInterceptor)
  async findOne(@Payload('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @MessagePattern('delete')
  @UseInterceptors(KafkaInterceptor)
  async delete(@Payload('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }

  @MessagePattern('addToCart')
  @UseInterceptors(KafkaInterceptor)
  async addToCart(@Payload() data: {userId: string, productId: string}): Promise<void> {
    await this.productService.addToCart(data.userId, data.productId);
  }

  @MessagePattern('customizeProduct')
  @UseInterceptors(KafkaInterceptor)
  async customizeProduct(@Payload() data: {productId: string, customizationOptions: any}): Promise<Product> {
    return await this.productService.customizeProduct(data.productId, data.customizationOptions);
  }

  @MessagePattern('addReview')
  @UseInterceptors(KafkaInterceptor)
  async addReview(@Payload() data: {userId: string, productId: string, review: any}): Promise<Product> {
    return await this.productService.addReview(data.userId, data.productId, data.review);
  }

  @MessagePattern('saveForLater')
  @UseInterceptors(KafkaInterceptor)
  async saveForLater(@Payload() data: {userId: string, productId: string}): Promise<void> {
    await this.productService.saveForLater(data.userId, data.productId);
  }

  @MessagePattern('shareProduct')
  @UseInterceptors(KafkaInterceptor)
  async shareProduct(@Payload() data: {userId: string, productId: string, platform: string}): Promise<void> {
    await this.productService.shareProduct(data.userId, data.productId, data.platform);
  }
}