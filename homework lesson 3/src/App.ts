import express from "express";
// import studentRouter from "./students/student.router";
import CourseRouter from "./Course/Course.Router";
import DaysRouter from "./Days/Days.Router";

const app = express();
app.use(express.json());




// ניתובים
app.use("/Course", CourseRouter);
app.use("/Days", DaysRouter);

app.get("/home/")
export default app;