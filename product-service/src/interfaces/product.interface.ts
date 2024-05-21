import { Document, Types } from 'mongoose';

export interface Review {
    userId: Types.ObjectId;
    review: string;
    rating: number;
    createdAt: Date;
}

export interface Product extends Document {
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