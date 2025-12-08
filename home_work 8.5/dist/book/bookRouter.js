"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookrouter = void 0;
const express_1 = require("express");
const bookService_1 = require("./bookService");
exports.bookrouter = (0, express_1.Router)();
const handleError = (res, error) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: errorMessage });
};
exports.bookrouter.post("/", async (req, res) => {
    try {
        const book = await (0, bookService_1.addBook)(req.body);
        res.status(201).json(book);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.bookrouter.get("/ShowAllBook", async (req, res) => {
    try {
        const books = await (0, bookService_1.getAllBooks)();
        res.json(books);
    }
    catch (error) {
        handleError(res, error);
    }
});
