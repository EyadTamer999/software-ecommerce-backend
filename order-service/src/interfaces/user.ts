/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

interface ordersQueue {
  orderId: string; // Assuming productId is of type string
}

export interface User extends Document{
    FirstName: string;
    LastName: string;
    readonly email: string;
    readonly password: string;

  

    phone: string;
    company: string;
    address: Array<{
        label: string;
        address: string;
      }>;

    readonly role: string;
    readonly Verification: boolean;
    readonly VerificationCode: string;
    readonly ordersQueue:ordersQueue[] ;
}