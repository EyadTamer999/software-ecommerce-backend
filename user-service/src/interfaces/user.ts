/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface User extends Document{
    FirstName: string;
    LastName: string;
    readonly email: string;
    readonly password: string;
    phone: string;
    readonly company: string;
    address: string;
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
}