import type { Request, Response, NextFunction } from "express";
import { logger } from "../Utils.ts/Logger.ts";



export function AuthorizatRole(req: Request, res: Response, next: NextFunction) {
  logger.debug("the role is: "+(req as any).role)
  if((req as any).role == "teacher")
    next();
  else return res.status(403).json({error: "the student is not allow to enter this page"})
  
}
