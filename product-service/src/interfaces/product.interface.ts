import { Document, Types } from 'mongoose';

interface Review {
    userId: Types.ObjectId;
    review: string;
    rating: number;
    createdAt: Date;
}

interface Product extends Document {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    availability: boolean;
    specifications: string;
    reviews: Review[];
    customizationOptions: any;
    relatedProducts: Types.ObjectId[];
    createdAt: Date;
}

export default Product;