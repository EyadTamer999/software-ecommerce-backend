/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';


export const OrderSchema = new mongoose.Schema({
    
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderStatus: { type: String, required: true, enum: ['open', 'closed', 'cancelled', 'pending'], default: 'open' },
    orderItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, // required: true 
            // quantity: { type: Number }, // required: true
            // rent : { type: Boolean},  // required: true
        }
    ],
    shippingAddress: {
        label: { type: String, required: true },
        address: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true, enum: ['cash', 'card'], default: 'cash' },
    deliveryStatus: { type: String, required: true, enum: ['pending', 'delivered', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number },
    deliveryDate: { type: Date, default: () => Date.now() + 15 * 24 * 60 * 60 * 1000},
    paymentStatus: { type: String, required: true, enum: ['unpaid', 'paid'], default: 'unpaid' },
    couponCode : { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' , default : null},
    createdAt: { type: Date, default: Date.now },
    
    });