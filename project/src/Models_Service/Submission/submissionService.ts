import { submissionModel } from "./submissionModel.ts";
import { assignmentModel } from "../Assignment/assignmentModel.ts";



export async function getAllSubmissions() {
  try {
    const submissions = await submissionModel.find()
      .populate("studentId")
      .populate("assignmentId");

    return submissions;
  } catch (err) {
    throw new Error("Failed to fetch submissions");
  }
}

export async function addasubmission(submissionData: any) {
  const submission = new submissionModel(submissionData);
  await submission.save();
  return submission;
}
export async function getAvgGradesPerStudent() {
    try {
        const submissions = await submissionModel.find({ grade: { $ne: null } });

        console.log("Step 1: Found in DB:", submissions.length);

        const studentStats: Record<string, { total: number, count: number }> = {};

        submissions.forEach((sub: any) => {
            const sId = sub.studentId ? sub.studentId.toString() : null;
            const grade = sub.grade !== undefined ? Number(sub.grade) : NaN;

            if (!sId || isNaN(grade)) return;

            if (!studentStats[sId]) {
                studentStats[sId] = { total: 0, count: 0 };
            }

            studentStats[sId].total += grade;
            studentStats[sId].count += 1;
        });

        const finalResult = Object.entries(studentStats).map(([sId, stats]) => ({
            studentId: sId,
            averageGrade: stats.total / stats.count,
            
        }));

        console.log("Step 2: Final objects created:", finalResult.length);
        return finalResult;

    } catch (err) {
        console.error("Critical error:", err);
        throw err;
    }
}

export async function getSubmissionsbyStudent(studentId: string) {
  try {
    const submissions = await submissionModel.find({ studentId })
      .populate("assignmentId");

    return submissions;
  } catch (err) {
    throw new Error("Failed to fetch submissions");
  }
}
export async function getavgbyclass(classid: string) {
    try {
        const allSubmissions = await submissionModel.find({ grade: { $ne: null } })
            .populate('studentId'); 

        const classGrades = allSubmissions.filter((sub: any) => {

            if (!sub.studentId || typeof sub.studentId === 'string') {
                return false; 
            }

            const subClass = String(sub.studentId.classid || "").trim();
            const targetClass = String(classid || "").trim();

            return subClass === targetClass;
        });

        if (classGrades.length === 0) return 0;

        const total = classGrades.reduce((sum, sub) => sum + (sub.grade || 0), 0);
        return total / classGrades.length;
    } catch (err) {
        throw new Error("Failed to fetch average grades");
    }
}