import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../Utils.ts/Authentication.ts";


const authService = new AuthService();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader?.split(" ")[1]; 
  if (!token) {
    throw new Error();
   return res.status(401).json({ error: "No token provided" });
  }
  try{
    const decoded  = authService.verifyToken(token); 
    (req as any).userId = decoded.userId;
    (req as any).role = decoded.role;
    next();
  }
  catch (error)
  {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}