import type { Response, Request, NextFunction} from "express";
import { Router } from "express";
import { getAllAssignments, getOpenAssignments } from "../../Models_Service/Assignment/assignmentService.ts";
import { errorHandler } from "../../Middlewares/errorHendling.ts";
import { addasubmission, getavgbyclass, getSubmissionsbyStudent } from "../../Models_Service/Submission/submissionService.ts";
import { authenticate } from "../../Middlewares/authenticationMid.ts";
import { getAllusers } from "../../Models_Service/User/userService.ts";
import { logger } from "../../Utils.ts/Logger.ts";
import { AppError } from "../../Utils.ts/AppError.ts";
import { userModel } from "../../Models_Service/User/userModel.ts";

export const studentRouter = Router();


studentRouter.get("/all",authenticate,async (req: Request, res: Response,next: NextFunction) => {
  try {
    const assignments = await getOpenAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    next(new AppError("Failed to load assignments", 500));
  }
});

studentRouter.post("/",authenticate, async (req: Request, res: Response,next: NextFunction) => {
  try {
    const submission = await addasubmission(req.body);
    const studentid = (req as any).userId;
    const assignmentId = submission.assignmentId;
    logger.info(`New submission added by student: ${studentid}, assignment id: ${assignmentId}`);

    res.status(201).json(submission);
  } catch (error) {
     next(new AppError("Failed to add submission", 500));
  }
});

studentRouter.get("/me",authenticate, async (req: Request, res: Response,next: NextFunction) => {
  try {
    const studentId = (req as any).userId;
    const submissions = await getSubmissionsbyStudent(studentId);
    res.status(200).json(submissions);
  } catch (error) {
    next(new AppError("Failed to load submissions by student", 500));
  }
});

