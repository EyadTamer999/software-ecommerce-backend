import { Document, Types } from 'mongoose';

interface Review {
    userId: Types.ObjectId;
    review: string;
    rating: number;
    createdAt: Date;
}

interface Product extends Document {
    productId: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    availability: boolean;
    specifications: string;
    reviews: Review[];
    relatedProducts: Types.ObjectId[];
    createdAt: Date;
}

export default Product;