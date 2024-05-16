/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import {Userschema} from '../schemas/user.schemas'

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', Userschema),
    inject: ['DATABASE_CONNECTION'],
  },
];