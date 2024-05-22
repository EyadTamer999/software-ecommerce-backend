/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';

import { DeliveryFeesSchema } from '../schemas/deliveryFees';

export const deliveryProviders = [
    {
        provide: 'DELIVERY_FEES_MODEL',
        useFactory: (connection: Connection) => connection.model('DeliveryFees', DeliveryFeesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    ];