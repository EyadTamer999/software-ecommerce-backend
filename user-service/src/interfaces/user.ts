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
      appartment: string;
      floor: string;
      street: string;
      building: string;
      postalcode: string;
      city: string;
      country: string;
      state: string;
      extra_description: string;
    }>;

    cards: Array<{
        name: string;
        cardnumber: string;
        expiration: string;
        cvv: string;
        // _id: string;
      }>;
    cart: Array<{
      id: string,
      name: string,
        rent: boolean;
        rent_duration: number;
        quantity: number;
        size: string,
        color: string,
        material: string,
        price: string,
      }>;
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
    ordersQueue: Array<string>;
    
}