import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Product  from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }
  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ productId: id }).exec();
  }
  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
  async addToCart(userId: string, productId: string): Promise<void> {
    // Implementation depends on your cart model
  }

  async customizeProduct(productId: string, customizationOptions: any): Promise<Product> {
    // Implementation depends on your product model and customization options
    return null; // Replace null with the actual implementation
  }

  async addReview(userId: string, productId: string, review: any): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    product.reviews.push({ userId, ...review });
    return await product.save();
  }

  async saveForLater(userId: string, productId: string): Promise<void> {
    // Implementation depends on your wishlist model
  }

  async shareProduct(userId: string, productId: string, platform: string): Promise<void> {
    // Implementation depends on your sharing functionality
  }
}