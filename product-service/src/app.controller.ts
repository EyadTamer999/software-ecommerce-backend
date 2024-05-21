import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductService } from './app.service';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createProductDto } from './DTO/createProduct.dto';

@Controller('products')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('getAllProducts')
  @UseInterceptors(KafkaInterceptor)
  async getAllProducts(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];
    return await this.productService.getAllProducts(JwtToken);
  }

  @MessagePattern('getProduct')
  @UseInterceptors(KafkaInterceptor)
  async getProduct(@Payload() payload:{id:string , jwtToken: string }): Promise<any> {
    const {id , jwtToken } = payload;
    return await this.productService.getProduct(id , jwtToken);
  }

  @MessagePattern('deletProduct')
  @UseInterceptors(KafkaInterceptor)
  async deleteProduct(@Payload() payload:{id:string , jwtToken: string }): Promise<any> {
    const {id , jwtToken } = payload;
    return await this.productService.deleteProduct(id , jwtToken);
  }

  @MessagePattern('addToCart')
  @UseInterceptors(KafkaInterceptor)
  async addToCart(@Payload() data: {userId: string, productId: string}): Promise<any> {
    await this.productService.addToCart(data.userId, data.productId);
  }

  @MessagePattern('customizeProduct')
  @UseInterceptors(KafkaInterceptor)
  async customizeProduct(@Payload() data: {productId: string, customizationOptions: any}): Promise<any> {
    return await this.productService.customizeProduct(data.productId, data.customizationOptions);
  }

  @MessagePattern('addReview')
  @UseInterceptors(KafkaInterceptor)
  async addReview(@Payload() data: {userId: string, productId: string, review: any}): Promise<any> {
    return await this.productService.addReview(data.userId, data.productId, data.review);
  }

  @MessagePattern('saveForLater')
  @UseInterceptors(KafkaInterceptor)
  async saveForLater(@Payload() data: {userId: string, productId: string}): Promise<any> {
    await this.productService.saveForLater(data.userId, data.productId);
  }

  @MessagePattern('shareProduct')
  @UseInterceptors(KafkaInterceptor)
  async shareProduct(@Payload() data: {userId: string, productId: string, platform: string}): Promise<any> {
    await this.productService.shareProduct(data.userId, data.productId, data.platform);
  }

@MessagePattern('createProduct')
@UseInterceptors(KafkaInterceptor)
async createProduct(@Payload() data: {product: createProductDto , jwtToken: string} ): Promise<any> {
  const { product, jwtToken } = data;
  return await this.productService.createProduct(product,jwtToken);
}
}