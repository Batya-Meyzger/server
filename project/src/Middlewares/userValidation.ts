import type { Request, Response, NextFunction } from "express";
import { userModel } from "../Models_Service/User/userModel.ts";

export async function validatepassword(req: Request, res: Response, next: NextFunction) {
  const {password, email,userId} = req.body;
  

  if (!password || typeof password !== "string" || !email|| !userId)  {
    return res.status(400).json({ error: "Missing required registration fields (email, password, userId)" });
  }

  if ( (!/(?=.[A-Za-z])(?=.\d)/.test(password)) && password.length < 8) {
    return res.status(400).json({ error: "Invalid ID.contain at least one letter and one digit, longer than 8 characters." });
  }
const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
       const error: any = new Error("Email already in use");
         error.statusCode = 400;
         throw error;

        }
 const existingId = await userModel.findOne({ userId });
    if (existingId) {
    const error: any = new Error("user ID already in use");
    error.statusCode = 400;
     throw error;

        }
  next();
}

