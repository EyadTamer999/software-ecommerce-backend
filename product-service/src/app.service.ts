import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import {Product}  from './interfaces/product.interface';
import { createProductDto } from './DTO/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(@Inject('USER_SERVICE') private clientKafka: ClientKafka , @Inject('PRODUCT_MODEL') private productModel: Model<Product> ) {
    this.clientKafka.subscribeToResponseOf('addToCart');
    this.clientKafka.subscribeToResponseOf('customizeProduct');
    this.clientKafka.subscribeToResponseOf('addReview');
    this.clientKafka.subscribeToResponseOf('saveForLater');
    this.clientKafka.subscribeToResponseOf('shareProduct');
    this.clientKafka.subscribeToResponseOf('getAllProducts');
    this.clientKafka.subscribeToResponseOf('getProduct');
    this.clientKafka.subscribeToResponseOf('deletProduct');
    this.clientKafka.subscribeToResponseOf('createProduct');
  }

  async getAllProducts(JwtToken:string ): Promise<any> {
    const products = await this.productModel.find().exec();
    await this.clientKafka.emit('getAllProducts', `Here you are all products`);
    return { success: true, data: products}
  }

  async getProduct(id: string , jwtToken:string): Promise<any> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    await this.clientKafka.emit('getProduct', `Here you are the product with id ${id}`);
    return { success: true, data: product}
  }

  async deleteProduct(id: string , jwtToken : string): Promise<any> {
    await this.productModel.findByIdAndDelete(id);
    await this.clientKafka.emit('deleteProduct', `Product with id ${id} has been deleted`);
    return { success: true, message: 'Product deleted successfully'}
  }

  async addToCart(userId: string, productId: string): Promise<void> {
    await this.clientKafka.emit('addToCart', `User ${userId} added product ${productId} to cart`);
  }

  async customizeProduct(productId: string, customizationOptions: any): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    product.customizationOptions = customizationOptions;
    await product.save();
    await this.clientKafka.emit('customizeProduct', `Product ${productId} has been customized with options: ${JSON.stringify(customizationOptions)}`);
    return product;
  }

  async addReview(userId: string, productId: string, review: any): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    product.reviews.push({ userId, ...review });
    await product.save();
    await this.clientKafka.emit('addReview', `User ${userId} added a review to product ${productId}`);
    return product;
  }

  async saveForLater(userId: string, productId: string): Promise<void> {
    await this.clientKafka.emit('saveForLater', `User ${userId} saved product ${productId} for later`);
  }

  async shareProduct(userId: string, productId: string, platform: string): Promise<void> {
    await this.clientKafka.emit('shareProduct', `User ${userId} shared product ${productId} on ${platform}`);
  }
  async createProduct(product: createProductDto,jwtToken : string): Promise<any> {
    const newProduct = new this.productModel(product);
    await newProduct.save();
    await this.clientKafka.emit('createProduct', `Product ${product.name} has been created`);
    return { success: true, data: newProduct}
  }


}