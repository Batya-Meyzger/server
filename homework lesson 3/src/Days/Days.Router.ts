
import express, {Request,Response} from "express";
import { DaysService } from  "./DaysWeek.Service";
import { Course } from "../Course/Course.Model";


const router = express.Router();
const daysService = new DaysService();
router.post("/:Courseid", (req, res) => {
    const day = req.query.Day as string;
    if (!day) {
        res.status(400).send("Missing 'Day' query parameter");
        return;
    } else {
        daysService.AddDayToCourse(Number(req.params.Courseid), day)
        res.send("הקורס נוסף בהצלחה");
    }
});
////
router.put("/:Courseid", (req, res) => {
    daysService.ChangeDayesOfCoures(Number(req.params.Courseid), req.body.newDays);
    res.send("ימי הקורס עודכנו בהצלחה" );
});
router.delete("/:Courseid", (req, res) => {
    const day = req.query.Day as string;
    if (!day) {
        res.status(400).send("Missing 'Day' query parameter");
        return;
    }
    else {
        daysService.DeleteDayToCourse(Number(req.params.Courseid), day);
        res.send(" the day was deleted successfully" );
    }
});
router.get("/AllOrderByDay", (req, res) => {
    const answer = daysService.allOrderByDay();
    res.json(answer);
});
    router.get("/", (req, res) => {
    const day = req.query.Day as string;
    if (!day) {
        res.status(400).send("Missing 'Day' query parameter");
        return;
    }
    const answer = daysService.OrderByDay(day);
    res.json(answer);
});
export default router;





