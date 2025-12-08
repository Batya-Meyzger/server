"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = addBook;
exports.getAllBooks = getAllBooks;
const bookModels_1 = require("./bookModels");
async function addBook(bookData) {
    const book = new bookModels_1.BookModel(bookData);
    await book.save();
    return book;
}
async function getAllBooks() {
    const books = await bookModels_1.BookModel.find();
    return books;
}
