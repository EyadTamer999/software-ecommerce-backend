/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';


export const OrderSchema = new mongoose.Schema({ 
    
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderStatus: { type: String, required: true, enum: ['open', 'closed', 'cancelled', 'pending'], default: 'open' },
    orderItems: [  
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            name : {type : String},
            quantity: { type: Number },
            rent : { type: Boolean},
            rent_duration : { type: Number},
            color : { type: String},    
            size : { type: String},   // [ 'small', 'medium', 'large']
            material  : { type: String},
            price : { type: Number},

        } 
    ],
    shippingAddress: {
        label: { type: String, required: true },
        appartment: { type: String, required: true },
        floor: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String, required: true },
        postalcode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        extra_description: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true, enum: ['cash', 'card'], default: 'card' },
    deliveryStatus: { type: String, required: true, enum: ['pending', 'delivered', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number },
    deliveryDate: { type: Date, default: () => Date.now() + 15 * 24 * 60 * 60 * 1000},
    paymentStatus: { type: String, required: true, enum: ['unpaid', 'paid'], default: 'unpaid' },
    couponCode : { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' , default : null},
    createdAt: { type: Date, default: Date.now },
    
    });