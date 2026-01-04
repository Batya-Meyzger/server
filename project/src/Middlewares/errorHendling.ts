import type { Request, Response, NextFunction } from "express";
import { logger } from "../Utils.ts/Logger.ts"; 

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  
  logger.error(`Error: ${err.message} | Path: ${req.method} ${req.url}`);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";


  return res.status(status).json({
    success: false,
    status: status,
    message: message 
  });
}


