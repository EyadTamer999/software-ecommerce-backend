/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';



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

    cards: Array<{
        name: string;
        cardnumber: string;
        expiration: string;
        cvv: string;
      }>;
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
    ordersQueue: Array<string>;
}