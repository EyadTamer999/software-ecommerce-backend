/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import {  settingsSchema } from '../schemas/settings.schema';

export const settingsProviders = [
    {
        provide: 'SETTINGS_MODEL',
        useFactory: (connection: Connection) => connection.model('Settings', settingsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    ];