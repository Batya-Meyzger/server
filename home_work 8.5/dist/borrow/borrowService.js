"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowsByUserId = getBorrowsByUserId;
exports.getAllBorrows = getAllBorrows;
const borrowModels_1 = require("./borrowModels");
const userModels_1 = require("../users/userModels");
async function getBorrowsByUserId(idNumber) {
    const user = await userModels_1.UserModel.findOne({ _id: idNumber });
    if (!user) {
        throw new Error("משתמש לא נמצא");
    }
}
async function getAllBorrows() {
    const borrows = await borrowModels_1.BorrowModel.find()
        .populate("userId", "name")
        .populate("bookId", "namebook");
    return borrows;
}
