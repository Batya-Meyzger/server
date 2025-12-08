"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./users/userRouter");
const bookRouter_1 = require("./book/bookRouter");
const borrowRouter_1 = require("./borrow/borrowRouter");
const myDB_1 = require("./myDB");
const app = (0, express_1.default)();
app.use(express_1.default.json());
myDB_1.myDB.getDB();
app.use('/users', userRouter_1.userrouter);
app.use('/books', bookRouter_1.bookrouter);
app.use('/borrow', borrowRouter_1.borrowrouter);
app.use((err, req, res, next) => {
    res.status(500).send(err);
});
exports.default = app;
