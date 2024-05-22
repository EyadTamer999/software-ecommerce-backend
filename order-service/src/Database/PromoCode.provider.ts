/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';

import { PromoCodeSchema } from '../schemas/promoCode';

export const PromoCodeProvider = [
    {
        provide: 'PROMO_CODE_MODEL',
        useFactory: (connection: Connection) => connection.model('PromoCode', PromoCodeSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


