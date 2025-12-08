import mongoose,{Document,Schema,Model} from "mongoose";
import { IBook } from "../book/bookModels";
//import { IUser } from "../users/userModels";
import { UserModel } from "../users/userModels";
export interface IBorrow extends Document {
    userId: string;
    bookId:mongoose.Types.ObjectId | IBook;
    borrowDate: Date;
 
}
const BorrowSchema: Schema<IBorrow> = new Schema({
    userId: { type: String, required: true, ref: 'User' },
    bookId: { type: mongoose.Types.ObjectId, required: true, ref: 'Book' },
    borrowDate: { type: Date, default: Date.now }, 
 });
 export const BorrowModel: Model<IBorrow> = mongoose.model<IBorrow>('borrow', BorrowSchema);
