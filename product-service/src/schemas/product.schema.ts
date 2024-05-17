import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    ProductId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    specifications: [{ type: String }],
    customizationOptions: {
        sizes: [{ type: String }],
        colors: [{ type: String }],
        materials: [{ type: String }],
    },
    rentalOptions: [
        {
            duration: { type: Number },
            price: { type: Number },
        },
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: { type: String },
            rating: { type: Number, min: 1, max: 5 },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    relatedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        },
    ],
    createdAt: { type: Date, default: Date.now },
});