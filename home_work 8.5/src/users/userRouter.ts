
import { Router, Request, Response } from "express";
import { UserModel } from "./userModels";
export const  userrouter= Router();
userrouter.post('/', async (req :Request, res :Response) => {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).send(user);
});
userrouter.get('/', async (req :Request, res :Response) => {
    const users = await UserModel.find();
    res.send(users);
});