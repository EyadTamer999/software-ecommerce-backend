/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

interface ordersQueue {
  orderId: string; // Assuming productId is of type string
}

export interface User extends Document{
    readonly FirstName: string;
    readonly LastName: string;
    readonly email: string;
    readonly password: string;
    readonly phone: string;
    readonly company: string;
    readonly address: Array<{
        label: string;
        address: string;
      }>;
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
    readonly ordersQueue: ordersQueue[];

}