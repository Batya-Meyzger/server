
import { Router, Request, Response } from "express";
import { addBook, getAllBooks } from "./bookService";

export const bookrouter = Router();

const handleError = (res: Response, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return res.status(500).json({ error: errorMessage });
};


bookrouter.post("/", async (req: Request, res: Response) => {
  try {
    const book = await addBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    handleError(res, error);
  }
});


bookrouter.get("/ShowAllBook", async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    handleError(res, error);
  }
});
