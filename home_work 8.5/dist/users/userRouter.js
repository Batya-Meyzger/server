"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userrouter = void 0;
const express_1 = require("express");
const userModels_1 = require("./userModels");
exports.userrouter = (0, express_1.Router)();
exports.userrouter.post('/', async (req, res) => {
    const user = new userModels_1.UserModel(req.body);
    await user.save();
    res.status(201).send(user);
});
exports.userrouter.get('/', async (req, res) => {
    const users = await userModels_1.UserModel.find();
    res.send(users);
});
