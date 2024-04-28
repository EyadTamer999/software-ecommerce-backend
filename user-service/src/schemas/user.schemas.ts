/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

export const Userschema = new mongoose.Schema({
  name: String,
  email: String,
});
