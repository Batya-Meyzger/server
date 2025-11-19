import { Request, Response, NextFunction } from "express";
export function validateId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID. Must be a number." });
  }
  next();
}

export function checkIfNumber(fieldName: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const value = req.body[fieldName];

    if (value === undefined) {
      res.status(400).json({ error: `${fieldName} is missing from body` });
      return;
    }

    const num = Number(value);
    if (isNaN(num)) {
      res.status(400).json({ error: `${fieldName} must be a valid number` });
      return;
    }

    next();
  };
}