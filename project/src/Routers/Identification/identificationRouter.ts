import type {NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { userModel } from '../../Models_Service/User/userModel.ts';
import { validatepassword } from '../../Middlewares/userValidation.ts';
import { logger } from '../../Utils.ts/Logger.ts';
import { AuthService } from '../../Utils.ts/Authentication.ts';
import { login } from '../../Models_Service/User/userService.ts';

export const identificationRouter = Router();


identificationRouter.post('/register', validatepassword,  async (req :Request, res :Response) => {
    const user = new userModel(req.body);
    await user.save();

    res.status(201).json(user);
});


identificationRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const result = await login(req);
        

        if (!result || !result.token) {
             console.error("Token is missing from result!");
        }
        
        return res.status(200).json({
            message: "התחברות הצליחה",
            token: result.token
        });
    } catch (error) {
     logger.warn(`Failed login attempt for user: ${req.body.userId}`);
       return next(error); 
    }
});