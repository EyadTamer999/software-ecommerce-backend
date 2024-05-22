/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const DeliveryFeesSchema = new mongoose.Schema({
    deliveryFees: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    });


