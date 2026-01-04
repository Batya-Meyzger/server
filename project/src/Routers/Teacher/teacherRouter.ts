import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { addassignment } from "../../Models_Service/Assignment/assignmentService.ts";
import { errorHandler  } from "../../Middlewares/errorHendling.ts";
import { getAllSubmissions, getAvgGradesPerStudent } from "../../Models_Service/Submission/submissionService.ts";
import { submissionModel } from "../../Models_Service/Submission/submissionModel.ts";
import { getAllAssignments } from "../../Models_Service/Assignment/assignmentService.ts";
import { AuthorizatRole } from "../../Middlewares/authorizationMid.ts";
import { authenticate } from "../../Middlewares/authenticationMid.ts";
import { logger } from "../../Utils.ts/Logger.ts";
import { AppError } from "../../Utils.ts/AppError.ts";
export const teacherRouter = Router();

teacherRouter.post("/", authenticate,AuthorizatRole,async (req: Request, res: Response,next: NextFunction) => {
  try {
    
    const assignment = await addassignment(req.body);
    const assignmentTitle = assignment.title;
logger.info(`New assignment added by teacher, assignment title: ${assignmentTitle}`);

    res.status(201).json(assignment);
  } catch (error) {
    console.error("המקור לשגיאה:", error);
    next(new AppError("Failed to add assignment", 500));
  }
});


teacherRouter.get("/all",authenticate,AuthorizatRole, async (req: Request, res: Response,next: NextFunction) => {
  try {
    const submissions = await getAllSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    next(new AppError("Failed to load submissions", 500));
  }
});

teacherRouter.put('/student/:studentid/assignment/:assignmentId',authenticate,AuthorizatRole, async (req: Request, res: Response,next: NextFunction) => {
    try {
      const { studentid, assignmentId } = req.params;
      const { grade, feedback } = req.body;

      if (!studentid || !assignmentId) {
        return next(new AppError("Student ID and Assignment ID are required", 400));
      }
      const assignment = await submissionModel.findOne({
        studentId: studentid,
        assignmentId: assignmentId
      });

      if (!assignment) {
        return next(new AppError("Assignment not found for the given student", 404));
      }

      
      if (grade !== undefined) assignment.grade = grade;
      if (feedback !== undefined) assignment.feedback = feedback;

      await assignment.save(); 
      res.json({ message: "Assignment updated successfully", assignment });
    } catch (err) {
      next(new AppError("Failed to update assignment", 500));
    }
  }
);

teacherRouter.get("/students-avg", authenticate, AuthorizatRole, async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const studentsAverages = await getAvgGradesPerStudent();  
    
    res.status(200).json(studentsAverages);

    const userId = (req as any).userId;
    logger.info(`Teacher ${userId} viewed all student averages`);

  } catch (error) {
    console.error("DETAILED ERROR:", error);
    next(new AppError("Failed to load student averages", 500));
  }
});