import { Router, Request, Response } from "express";
import { BorrowModel } from "./borrowModels";
import { getAllBorrows } from "./borrowService";

export const borrowrouter = Router();

const handleError = (res: Response, error: unknown) => {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error";

  if (errorMessage.includes("not found")) {
    return res.status(404).json({ error: errorMessage });
  }

  if (errorMessage.includes("Cast to ObjectId failed")) {
    return res.status(400).json({ error: "Invalid ID format." });
  }

  return res.status(500).json({ error: errorMessage });
};

borrowrouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = new BorrowModel(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    handleError(res, error);
  }
});


borrowrouter.get("/all", async (req: Request, res: Response) => {
  try {
    const borrows = await getAllBorrows();
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ error: "Failed to load borrows" });
  }
});


 
  

