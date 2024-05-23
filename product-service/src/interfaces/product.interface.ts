import { Document } from 'mongoose';

interface Review {
    userId: string;
    review: string;
    rating: number;
    createdAt: Date;
}

export interface Product extends Document {
    name: string;
    category: string;
    discount: number;
    description: string;
    images: string[];
    buy_price: number;
    rent_price: number;
    availability: number; // 0->bought, 1->rented, 2->available
    stock: number;
    specifications: string[];
    size: string | null;
    color: string;
    material: string;
    rent_duration: number;
    wishers: string[];
    FavoriteFor: string[];
    reviews: Review[];
    relatedProducts: string[];
    createdAt: Date;
}