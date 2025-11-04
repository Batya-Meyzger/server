import express, {Request,Response} from "express";
import { CourseServic } from "./Course.Servic";
import { Course } from "./Course.Model";

const router = express.Router();
const courceServis = new CourseServic();

router.get("/", (req, res) => {
  res.json(courceServis.getAll());
});
router.get("/:courseid", (req, res) => {
  const cource = courceServis.getById(Number(req.params.courseid));
  cource ? res.json(cource) : res.status(499).send("course not found");
});
router.post("/", (req, res) => {
  const { id, name, Houres } = req.body;
  //console.log(req.body);
  const newCourse = new Course(id, name, Houres);
  //console.log(newCourse);
  const course = courceServis.add(newCourse);
  course? res.status(204).json(course) : res.status(498).send("course id already exsist");
});
router.delete("/:Courseid", (req, res) => {
  if(isNaN(Number(req.params.Courseid)))
    res.status(497).send("we expected to get id as a number")
  const success = courceServis.remove(Number(req.params.Courseid));
  success ? res.sendStatus(204).send("course deleted") : res.status(404).send("course not found");
});



export default router;