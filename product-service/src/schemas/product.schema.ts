import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category:{ type: String ,required: true},
    discount: { type: Number,required: true},
    description: { type: String, required: true },
    images: [{ type: String }],
    buy_price: { type: Number, required: true },
    rent_price: { type: Number, required: true },
    availability: { type: Number, required: true },//0->bought,1->rented,2->available
    stock: { type: Number, required: true },
    specifications: [{ type: String }],
    size: { type: String,default: null},
    color: { type: String },
    material: { type: String },
    rent_duration:{ type: Number},
    wishers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
    ],
    FavoriteFor: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
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