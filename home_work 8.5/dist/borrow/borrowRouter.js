"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowrouter = void 0;
const express_1 = require("express");
const borrowModels_1 = require("./borrowModels");
const borrowService_1 = require("./borrowService");
exports.borrowrouter = (0, express_1.Router)();
const handleError = (res, error) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("not found")) {
        return res.status(404).json({ error: errorMessage });
    }
    if (errorMessage.includes("Cast to ObjectId failed")) {
        return res.status(400).json({ error: "Invalid ID format." });
    }
    return res.status(500).json({ error: errorMessage });
};
exports.borrowrouter.post("/", async (req, res) => {
    try {
        const user = new borrowModels_1.BorrowModel(req.body);
        await user.save();
        res.status(201).send(user);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.borrowrouter.get("/all", async (req, res) => {
    try {
        const borrows = await (0, borrowService_1.getAllBorrows)();
        res.json(borrows);
    }
    catch (error) {
        handleError(res, error);
    }
});
