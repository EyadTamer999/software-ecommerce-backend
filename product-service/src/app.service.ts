import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kafka } from 'kafkajs';
import Product  from './interfaces/product.interface';

@Injectable()
export class ProductService {
  private kafka: Kafka;
  private producer: any;

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['kafka1:9092', 'kafka2:9092']
    });

    this.producer = this.kafka.producer();
  }

  async init() {
    await this.producer.connect();
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
    // Implementation depends on your cart model
    // Send a message to the 'add-to-cart' topic
    await this.producer.send({
      topic: 'add-to-cart',
      messages: [
        { value: `User ${userId} added product ${productId} to cart` },
      ],
    });
  }

  async customizeProduct(productId: string, customizationOptions: any): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    product.customizationOptions = customizationOptions;
    await product.save();
    // Send a message to the 'customize-product' topic
    await this.producer.send({
      topic: 'customize-product',
      messages: [
        { value: `Product ${productId} has been customized with options: ${JSON.stringify(customizationOptions)}` },
      ],
    });
    return product;
  }

  async addReview(userId: string, productId: string, review: any): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    product.reviews.push({ userId, ...review });
    await product.save();

    // Send a message to the 'add-review' topic
    await this.producer.send({
      topic: 'add-review',
      messages: [
        { value: `User ${userId} added a review to product ${productId}` },
      ],
    });

    return product;
  }

  async saveForLater(userId: string, productId: string): Promise<void> {
    // Implementation depends on your wishlist model
    // Send a message to the 'save-for-later' topic
    await this.producer.send({
      topic: 'save-for-later',
      messages: [
        { value: `User ${userId} saved product ${productId} for later` },
      ],
    });
  }

  async shareProduct(userId: string, productId: string, platform: string): Promise<void> {
    // Implementation depends on your sharing functionality
    // Send a message to the 'share-product' topic
    await this.producer.send({
      topic: 'share-product',
      messages: [
        { value: `User ${userId} shared product ${productId} on ${platform}` },
      ],
    });
  }
}