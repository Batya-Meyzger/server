
import { Request, Response, NextFunction } from "express";
import { min, max } from "../game/gameService";
export function checkIfNumberInRange(req: Request, res: Response, next: NextFunction) {
    const number = Number(req.params.guessnum);

    if (number < min || number > max) {
     
        return res.status(400).json({ error: "The num is not in the range" });
    }

    next();

}