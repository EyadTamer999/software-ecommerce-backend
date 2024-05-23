import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductService } from './app.service';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createProductDto,ReviewDto } from './DTO/createProduct.dto';

@Controller('products')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('getAllProducts')
  @UseInterceptors(KafkaInterceptor)
  async getAllProducts(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];
    return  this.productService.getAllProducts(JwtToken);
  }
  @MessagePattern('getTopProducts')
  @UseInterceptors(KafkaInterceptor)
  async getTopProducts(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];
    return  this.productService.getTopProducts(JwtToken);
  }
  @MessagePattern('getTopOffers')
  @UseInterceptors(KafkaInterceptor)
  async getTopOffers(@Payload() jwtToken: string): Promise<any> {
    const JwtToken = jwtToken['jwtToken'];
    return  this.productService.getTopOffers(JwtToken);
  }
  @MessagePattern('getCategory')
  @UseInterceptors(KafkaInterceptor)
  async getCategory(@Payload() payload:{category:string , jwtToken: string }): Promise<any> {
    const {category , jwtToken } = payload;
    return await this.productService.getCategory(category , jwtToken);
  }

  @MessagePattern('getProduct')
  @UseInterceptors(KafkaInterceptor)
  async getProduct(@Payload() payload:{id:string , jwtToken: string }): Promise<any> {
    const {id , jwtToken } = payload;
    return await this.productService.getProduct(id , jwtToken);
  }

  @MessagePattern('deleteProduct')
  @UseInterceptors(KafkaInterceptor)
  async deleteProduct(@Payload() payload:{id:any , jwtToken: string }): Promise<any> {
    const {id , jwtToken } = payload;
    return await this.productService.deleteProduct(id , jwtToken);
  }

  @MessagePattern('addToCart')
  async addToCart(@Payload() data: { productId: string}): Promise<any> {
    await this.productService.addToCart( data.productId);
  }

  @MessagePattern('customizeProduct')
  async customizeProduct(@Payload() data: {productId: string, size:string,color:string,material:string}): Promise<any> {
    const {productId, size,color,material} = data;
    return await this.productService.customizeProduct(productId, size,color,material);
  }

  @MessagePattern('addReview')
  async addReview(@Payload() data: {userId: string, productId: string, review: ReviewDto}): Promise<any> {
    return await this.productService.addReview(data.userId, data.productId, data.review);
  }

  @MessagePattern('saveForLater')
  @UseInterceptors(KafkaInterceptor)
  async saveForLater(@Payload() data: {userId: string, productId: string}): Promise<any> {
    await this.productService.saveForLater(data.userId, data.productId);
  }

  @MessagePattern('shareProduct')
  async shareProduct(@Payload() data: {userId: string, productId: string, platform: string}): Promise<any> {
    await this.productService.shareProduct(data.userId, data.productId, data.platform);
  }

@MessagePattern('createProduct')
@UseInterceptors(KafkaInterceptor)
async createProduct(@Payload() data: {product: createProductDto , jwtToken: string} ): Promise<any> {
  const { product, jwtToken } = data;
  console.log("product from app controller:", product);
  return  this.productService.createProduct(product,jwtToken);
}
}