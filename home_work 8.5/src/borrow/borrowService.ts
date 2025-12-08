import { BorrowModel } from "./borrowModels";
import { UserModel } from "../users/userModels";

export async function getBorrowsByUserId(idNumber: string) {
  const user = await UserModel.findOne({ _id: idNumber });

  if (!user) {
    throw new Error("משתמש לא נמצא");
  }
}

export async function getAllBorrows() {
  try {
    const borrows = await BorrowModel.find()
      .populate("userId", "name")
      .populate("bookId", "namebook");

    return borrows;
  } catch (err) {
    throw new Error("Failed to fetch borrows");
  }
}