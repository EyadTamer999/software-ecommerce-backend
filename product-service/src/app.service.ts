import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { decode } from 'jsonwebtoken';
import { ClientKafka } from '@nestjs/microservices';
import {Product} from './interfaces/product.interface';
import { createProductDto,ReviewDto } from './DTO/createProduct.dto';
@Injectable()
export class ProductService {
  constructor(@Inject('USER_SERVICE') private clientKafka: ClientKafka , @Inject('PRODUCT_MODEL') private productModel: Model<Product> ) {
    // this.clientKafka.subscribeToResponseOf('addToCart');
    this.clientKafka.subscribeToResponseOf('user_findByEmail');
    
  }
  private async getUserByToken(jwtToken: string) {
    const paylod = decode(jwtToken);
    // console.log('Payload:', paylod['user']);
    const email = paylod['email'];
    const data = await this.clientKafka.send('user_findByEmail' , email).toPromise();
    const user = data.user
    
    return user;
    
  }

  async getAllProducts(): Promise<any> {
    const products = await this.productModel.find().exec();

    return { success: true, data: products}
  }
  async getTopOffers(): Promise<any> {
    const products = await this.productModel.find().sort({ discount: -1 }).limit(5).exec();
    return { success: true, data: products }
}
async getTopProducts(): Promise<any> {
  const products = await this.productModel.aggregate([
      {
          $unwind: "$reviews"
      },
      {
          $group: {
              _id: "$_id",
              name: { $first: "$name" },
              category: { $first: "$category" },
              discount: { $first: "$discount" },
              description: { $first: "$description" },
              images: { $first: "$images" },
              buy_price: { $first: "$buy_price" },
              rent_price: { $first: "$rent_price" },
              availability: { $first: "$availability" },
              stock: { $first: "$stock" },
              specifications: { $first: "$specifications" },
              size: { $first: "$size" },
              color: { $first: "$color" },
              material: { $first: "$material" },
              rent_duration: { $first: "$rent_duration" },
              reviews: { $push: "$reviews" },
              relatedProducts: { $first: "$relatedProducts" },
              createdAt: { $first: "$createdAt" },
              avgRating: { $avg: "$reviews.rating" }
          }
      },
      {
          $sort: { avgRating: -1 }
      },
      {
          $limit: 5
      }
  ]);

  return { success: true, data: products }
}
  async getCategory(category: string): Promise<any> {
    const products = await this.productModel.find({ category: category }).exec();
 
    return { success: true, data: products }
}

  async getProduct(id: any): Promise<any> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { success: true, data: product}
  }
  //admin
  async deleteProduct(id: any , jwtToken : string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    await this.productModel.findByIdAndDelete(id);

    return { success: true, message: 'Product deleted successfully'}
  }
  //abdo work
  // async addToCart( productId: string): Promise<any> {
  //   //await this.clientKafka.emit('addToCart', `User ${userId} added product ${productId} to cart`);
  //   return { success: true, message: 'added to cart'}
  // }
  //abdo
  async customizeProduct(productId: string, size:string,color:string,material:string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    product.size =size;
    product.color =color;
    product.material =material;
  const materialPriceMap = {
    wood: 10,
    rubber: 15,
    plastic: 20,
    metal: 25,
    leather: 30,
    fabric: 35,
    glass: 40,
    ceramic: 45,
    stone: 50,
    paper: 55,
  };

  product.buy_price = materialPriceMap[product.material];
  if(size==='small'){product.buy_price*=0.8;}
  else if(size==='large'){product.buy_price*=1.2;}
  product.rent_price = product.buy_price / 10;
    return product;
  }
//Start of Reviews Section---------------------------------------------------------------------------------------
  
async addReview( productId: string, review: ReviewDto,jwtToken:string): Promise<any> {
  const user = await this.getUserByToken(jwtToken);
  if (!user) {
    return { message: 'User not found' };
  }

  if(user.Verification === false){
    return { message: 'User not verified' };
  }
    const product = await this.productModel.findOne({ _id: productId }).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const newReview = {
      userId: user._id.toString(),
      review: review.review,
      rating: review.rating,
      createdAt: review.createdAt || new Date()
    };

    product.reviews.push(newReview);
    await product.save();

  return product;
}

//get user reviews
//tested
async getUserReviews(jwtToken: string): Promise<any> {
  const user = await this.getUserByToken(jwtToken);
  const products = await this.productModel.find({ "reviews.userId": user._id }).exec();
  console.log('Products:', products);
  console.log('-------------------------------------------------------------');
  const reviews = [];
  for (let product of products) {
    for (let review of product.reviews) {
      if (review.userId.toString() === user._id.toString()) {
        reviews.push({
          productId: product._id,
          productName: product.name,
          review: review
        });
      }
    }
  }
  console.log('Reviews:', reviews);
  return { success: true, data: reviews };
}

//update user review on a product
//tested
async updateUserReview(productId: string, updatedReview: ReviewDto, jwtToken: string): Promise<any> {
  const user = await this.getUserByToken(jwtToken);
  if (!user) {
    return { message: 'User not found' };
  }
  if (user.Verification === false) {
    return { message: 'User not verified' };
  }
  const product = await this.productModel.findOne({ _id: productId }).exec();
  if (!product) {
    throw new NotFoundException('Product not found');
  }
  const reviewIndex = product.reviews.findIndex(review => review.userId.toString() === user._id.toString());
  if (reviewIndex === -1) {
    throw new NotFoundException('Review not found');
  }
  const updatedReviewData = {
    userId: user._id,
    review: updatedReview.review,
    rating: updatedReview.rating,
    createdAt: updatedReview.createdAt || new Date()
  };
  product.reviews[reviewIndex] = updatedReviewData;
  await product.save();
  return product;
}

//delete user review on a product
async deleteUserReview(productId: string,jwtToken: string): Promise<any> {
  const user = await this.getUserByToken(jwtToken);
  if (!user) {
    return { message: 'User not found' };
  }
  if (user.Verification === false) {
    return { message: 'User not verified' };
  }
  const product = await this.productModel.findOne({ _id: productId }).exec();
  if (!product) {
    throw new NotFoundException('Product not found');
  }
  const reviewIndex = product.reviews.findIndex(review => review.userId.toString() === user._id.toString());
  if (reviewIndex === -1) {
    throw new NotFoundException('Review not found');
  }
  product.reviews.splice(reviewIndex, 1);
  await product.save();
  return { success: true, message: 'Review deleted successfully' };
}



//End of Reviews Section---------------------------------------------------------
 
  //admin
  async createProduct(product: createProductDto,jwtToken : string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const newProduct = new this.productModel({...product});
    await newProduct.save();
    return { success: true, data: newProduct}
  }

  //New Work!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //tested!
  async getUserFavoriteProducts(JwtToken:string): Promise<any> {
    const user = await this.getUserByToken(JwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const products = await this.productModel.find({ FavoriteFor: { $in: [user._id] } }).exec();
    return { success: true, data: products }
  }
  //tested!
  async getUserWishProducts(JwtToken:string): Promise<any> {
    const user = await this.getUserByToken(JwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const products = await this.productModel.find({ wishers: { $in: [user._id] } }).exec();
    return { success: true, data: products }
  }
  //tested!
  async removeProductFromMyFavorite( productId: string,JwtToken:string): Promise<any> {
    const user = await this.getUserByToken(JwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const product = await this.productModel.findOne({ _id: productId }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const index = product.FavoriteFor.indexOf(user._id);
    if (index > -1) {
      product.FavoriteFor.splice(index, 1);
      await product.save();
    }
    return { success: true, message: 'Removed Product From favorite list' };
  }
 //tested!
  async removeProductFromMyWish( productId: string,JwtToken: string): Promise<any> {
    const user = await this.getUserByToken(JwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const product = await this.productModel.findOne({ _id: productId }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const index = product.wishers.indexOf(user._id);
    if (index > -1) {
      product.wishers.splice(index, 1);
      await product.save();
    }
    return { success: true, message: 'Removed Product From wish list' };
  }
  //tested!
  async postUserFavoriteProduct(productId: string,JwtToken: string): Promise<any> {
    const user = await this.getUserByToken(JwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const product = await this.productModel.findOne({ _id: productId }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.FavoriteFor.push(user._id);
    await product.save();
    return { success: true, message: 'Product added to favorite list' };
  }
  //tested!
  async postUserWishProduct(productId: string,JwtToken: string): Promise<any> {
    const user = await this.getUserByToken(JwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const product = await this.productModel.findOne({ _id: productId }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.wishers.push(user._id);
    await product.save();
    return { success: true, message: 'Product added to wish list' };
  }

}