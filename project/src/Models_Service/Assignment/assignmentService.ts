import {assignmentModel } from "../Assignment/assignmentModel.ts";

export async function addassignment(assignmentData: any) {
  const assignment = new assignmentModel(assignmentData);
  await assignment.save();
  return assignment;
}
export const getOpenAssignments = async () => {
    const assignments = await assignmentModel.find({ dueDate: { $gte: new Date() } });
    return assignments;
}
export const getAllAssignments = async () => {
    const assignments = await assignmentModel.find();
    return assignments;
}