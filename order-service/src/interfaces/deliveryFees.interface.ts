/* eslint-disable prettier/prettier */

import { Document } from 'mongoose';

// Define interface for delivery fees
export interface DeliveryFees extends Document {
    deliveryFees: number;
    city: string;
}
