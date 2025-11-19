import { Request, Response, NextFunction } from "express";
import { AuthService } from "../utils/Authentication";
import { logger } from "../utils/logger";

const authService = new AuthService();

export function authenticatAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader?.split(" ")[1]; // פורמט: "Bearer <token>";
  if (!token) {
    return res.status(401).json({ error: "Missing token!!!!!!!!!!!!!!!!" });
  }
  try{
    const decoded  = authService.verifyToken(token); 
    (req as any).user = decoded.username;
    next();
  }
  catch (error)
  {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function AuthorizatAdmin(req: Request, res: Response, next: NextFunction) {
  logger.debug("the user is: "+(req as any).user)
  if((req as any).user == "admin")
    next();
  else return res.status(403).json({error: "the user not allow to enter this page"})
}

//קוד ישן
export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token !== "Bearer 12345") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

