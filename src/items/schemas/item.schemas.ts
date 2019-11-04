import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  name: String,
  mail: String,
  description: String,
});
