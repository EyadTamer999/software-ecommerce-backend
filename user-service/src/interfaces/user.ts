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
<<<<<<< HEAD
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
=======
        label: string;
        address: string;
      }>;

>>>>>>> e4cc43b3 (Initial)
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
    ordersQueue: Array<string>;
<<<<<<< HEAD
    
=======
>>>>>>> e4cc43b3 (Initial)
}