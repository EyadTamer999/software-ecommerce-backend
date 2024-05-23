import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './app.service';
import { KafkaInterceptor } from './guards/kafka-Interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminAuthorizationGuard } from './guards/adminAuthorization.guard';
import { createProductDto,ReviewDto } from './DTO/createProduct.dto';

@Controller('products')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('getAllProducts')
  async getAllProducts(): Promise<any> {
    return  this.productService.getAllProducts();
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
@UseGuards(AdminAuthorizationGuard)
async createProduct(@Payload() data: {product: createProductDto , jwtToken: string} ): Promise<any> {
  const { product, jwtToken } = data;
  console.log("product from app controller:", product);
  return  this.productService.createProduct(product,jwtToken);
}


//New Work!!!!!!!!!!!!!!!!!!!!!!!!!!
@MessagePattern('getUserFavoriteProducts')
@UseInterceptors(KafkaInterceptor)
async getUserFavoriteProducts(@Payload() data: { jwtToken: string }): Promise<any> {
  const { jwtToken } = data;
  return  this.productService.getUserFavoriteProducts(jwtToken);
}
@MessagePattern('getUserWishProducts')
@UseInterceptors(KafkaInterceptor)
async getUserWishProducts(@Payload() data: {jwtToken: string }): Promise<any> {
  const {  jwtToken } = data;
  return  this.productService.getUserWishProducts(jwtToken);
}
@MessagePattern('removeProductFromMyWish')
@UseInterceptors(KafkaInterceptor)
async removeProductFromMyWish(@Payload() data: { productId: string,jwtToken: string }): Promise<any> {
  const {  productId,jwtToken } = data;
  return await this.productService.removeProductFromMyWish(productId,jwtToken);
}
@MessagePattern('removeProductFromMyFavorite')
@UseInterceptors(KafkaInterceptor)
async removeProductFromMyFavorite(@Payload() data: {productId: string,jwtToken: string }): Promise<any> {
  const {  productId,jwtToken } = data;
  return await this.productService.removeProductFromMyFavorite( productId,jwtToken);
}
@MessagePattern('postUserFavoriteProduct')
@UseInterceptors(KafkaInterceptor)
async postUserFavoriteProduct(@Payload() data: { productId: string,jwtToken: string }): Promise<any> {
  const {productId,jwtToken } = data;
  return await this.productService.postUserFavoriteProduct( productId,jwtToken);}

@MessagePattern('postUserWishProduct')
@UseInterceptors(KafkaInterceptor)
async postUserWishProduct(@Payload() data: { productId: string,jwtToken: string }): Promise<any> {
  const {  productId,jwtToken } = data;
  return await this.productService.postUserWishProduct( productId,jwtToken);}
}