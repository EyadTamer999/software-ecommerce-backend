/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';


export const PromoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    usersUsed: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }],
        default: []
      },

    expiryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    
    });