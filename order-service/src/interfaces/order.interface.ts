/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

// Define interface for order items
interface OrderItem {
    productId: string; // Assuming productId is of type string
    quantity: number;
    rent: boolean;
}

// Define interface for shipping address
interface ShippingAddress {
<<<<<<< HEAD
    label: string,
    appartment: string,
    floor: string,
    street: string,
    building: string,
    postalcode: string,
    city: string,
    country: string,
    state: string,
    extra_description: string
    
=======
    label: string;
    address: string;
>>>>>>> e4cc43b3 (Initial)
}

// Define interface for the order document
export interface Order extends Document {
    user: string; // Assuming user is of type string
    orderStatus: 'open' | 'closed' | 'cancelled' | 'pending';
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: 'cash' | 'card';
    deliveryStatus: 'pending' | 'delivered' | 'cancelled';
    totalPrice: number;
    deliveryDate?: Date;
    paymentStatus: 'unpaid' | 'paid';
    couponCode: string;
    createdAt: Date;
}
