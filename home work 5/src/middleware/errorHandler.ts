import { Request, Response, NextFunction } from "express";
import {logger} from "../utils/logger"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Error: ${err.message || err}`)
  //console.log("Error:", err.message || err);
  res.status(500).json({ error: err.message });
}
