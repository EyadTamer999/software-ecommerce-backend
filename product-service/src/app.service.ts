import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import Product  from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('addToCart');
    this.clientKafka.subscribeToResponseOf('customizeProduct');
    this.clientKafka.subscribeToResponseOf('addReview');
    this.clientKafka.subscribeToResponseOf('saveForLater');
    this.clientKafka.subscribeToResponseOf('shareProduct');
    await this.clientKafka.connect();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id }).exec();
  }

  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
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
  async create(createProductDto: any): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
}
}