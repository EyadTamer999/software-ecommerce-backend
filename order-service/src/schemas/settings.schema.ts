/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const settingsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
  });
  