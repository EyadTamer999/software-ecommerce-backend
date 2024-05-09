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
    label: string;
    address: string;
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
