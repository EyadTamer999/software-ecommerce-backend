import { Document } from 'mongoose';

interface Review {
    userId: string;
    review: string;
    rating: number;
    createdAt: Date;
}

interface Product extends Document {
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
    size: string;
    color: string;
    material: string;
    rent_duration: number;
    reviews: Review[];
    relatedProducts: string[];
    createdAt: Date;
}

export default Product;