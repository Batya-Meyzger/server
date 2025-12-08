
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBook extends Document {
 
Title: string;
Author: string;
}

const BookSchema: Schema<IBook> = new Schema({

Title: { type: String, required: true },
Author: { type: String, required: true }}

);
export const BookModel: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);