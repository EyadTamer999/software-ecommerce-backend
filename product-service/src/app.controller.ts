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

   @MessagePattern('getTopProducts')
  async getTopProducts(): Promise<any> {
    return  this.productService.getTopProducts();}

  @MessagePattern('getTopOffers')
  async getTopOffers():Promise<any> {
    return  this.productService.getTopOffers();
  }

 
  @MessagePattern('getCategory')
  
  async getCategory(@Payload() payload:{category:string}): Promise<any> {
    const {category} = payload;
    return await this.productService.getCategory(category);
  }

  @MessagePattern('getProduct')
  async getProduct(@Payload() payload:{id:string }): Promise<any> {
    const {id} = payload;
    return await this.productService.getProduct(id);
  }

  @MessagePattern('deleteProduct')
  @UseInterceptors(KafkaInterceptor)
  @UseGuards(AdminAuthorizationGuard)
  async deleteProduct(@Payload() payload:{id:any , jwtToken: string }): Promise<any> {
    const {id , jwtToken } = payload;
    return await this.productService.deleteProduct(id , jwtToken);
  }

  // @MessagePattern('addToCart')
  // async addToCart(@Payload() data: { productId: string}): Promise<any> {
  //   await this.productService.addToCart( data.productId);
  // }
  //abdo work
  @MessagePattern('customizeProduct')
  async customizeProduct(@Payload() data: {productId: string, size:string,color:string,material:string}): Promise<any> {
    const {productId, size,color,material} = data;
    return await this.productService.customizeProduct(productId, size,color,material);
  }


  //Review Section ---------------------------------------------------------
  @MessagePattern('addReview')
  @UseInterceptors(KafkaInterceptor)
  async addReview(@Payload() data: { productId: string, review: ReviewDto,jwtToken: string}): Promise<any> {
    return await this.productService.addReview( data.productId, data.review,data.jwtToken);
  }

  @MessagePattern('getUserReviews')
  @UseInterceptors(KafkaInterceptor)
  async getUserReviews(@Payload() data: { jwtToken: string}): Promise<any> {
    const { jwtToken } = data;
    return await this.productService.getUserReviews(jwtToken);
  }

  @MessagePattern('deleteUserReview')
  @UseInterceptors(KafkaInterceptor)
  async deleteUserReview(@Payload() data: { productId: string,jwtToken: string }):Promise<any> {
    const { productId,jwtToken } = data;
    return await this.productService.deleteUserReview(productId,jwtToken);
  }

  @MessagePattern('updateUserReview')
  @UseInterceptors(KafkaInterceptor)
  async updateUserReview(@Payload() data: { productId: string, review: ReviewDto,jwtToken: string }): Promise<any> {
    const { productId, review,jwtToken } = data;
    return await this.productService.updateUserReview(productId, review,jwtToken);
  }
  //End of Review Section -------------------------------------------------------

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