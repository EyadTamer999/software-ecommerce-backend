import { Controller, Get, Param, Delete, Post, Body, UseInterceptors } from '@nestjs/common';
import { ProductService } from './app.service';
import { Product } from './interfaces/product.interface';
import { KafkaInterceptor } from './guards/kafka-Interceptor';

@Controller('products')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseInterceptors(KafkaInterceptor)
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseInterceptors(KafkaInterceptor)
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Delete(':id')
  @UseInterceptors(KafkaInterceptor)
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }

  @Post(':userId/cart/:productId')
  @UseInterceptors(KafkaInterceptor)
  async addToCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.productService.addToCart(userId, productId);
  }

  @Post(':productId/customize')
  @UseInterceptors(KafkaInterceptor)
  async customizeProduct(
    @Param('productId') productId: string,
    @Body() customizationOptions: any,
  ): Promise<Product> {
    return await this.productService.customizeProduct(
      productId,
      customizationOptions,
    );
  }

  @Post(':userId/reviews/:productId')
  @UseInterceptors(KafkaInterceptor)
  async addReview(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() review: any,
  ): Promise<Product> {
    return await this.productService.addReview(userId, productId, review);
  }

  @Post(':userId/save-for-later/:productId')
  @UseInterceptors(KafkaInterceptor)
  async saveForLater(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.productService.saveForLater(userId, productId);
  }

  @Post(':userId/share/:productId/:platform')
  @UseInterceptors(KafkaInterceptor)
  async shareProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Param('platform') platform: string,
  ): Promise<void> {
    await this.productService.shareProduct(userId, productId, platform);
  }
}