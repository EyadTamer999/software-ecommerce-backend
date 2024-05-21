/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';


export interface PromoCode extends Document {
    code: string;
    discount: number;
    usersUsed: string[];
    expiryDate: Date;
    createdAt: Date;
    
}