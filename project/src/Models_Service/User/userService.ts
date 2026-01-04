import { userModel } from "../User/userModel.ts";
import  type { Request, Response  } from "express";
import { AppError } from "../../Utils.ts/AppError.ts";
import jwt from "jsonwebtoken";


export const login = async (req: Request) => {
    try {
        
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) {
            
           throw new AppError("משתמש לא קיים", 404)
        }
        if (!user.password) {
            throw new AppError("password is undefined", 401);
        }

        const isMatch = (password === user.password);
        if (!isMatch) {
            throw new AppError("סיסמה שגויה", 401);
        }

        if (!process.env.JWT_SECRET) {
            throw new AppError("JWT_SECRET is not defined", 500);
         }

       
        const token = jwt.sign(
            { userId: user.userId, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        
        return { user, token };

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const getAllusers = async () => {
    const users = await userModel.find();
    return users;
}