import { BookModel } from "./bookModels";

export async function addBook(bookData: any) {
  const book = new BookModel(bookData);
  await book.save();
  return book;
}

export async function getAllBooks() {
  const books = await BookModel.find();
  return books;
}
