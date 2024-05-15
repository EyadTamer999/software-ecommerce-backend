/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface User extends Document{
    readonly FirstName: string;
    readonly LastName: string;
    readonly email: string;
    password: string;
    readonly phone: string;
    readonly company: string;
    readonly address: Array<{
        label: string;
        address: string;
      }>;
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
}