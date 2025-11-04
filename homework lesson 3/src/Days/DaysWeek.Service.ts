import { CourseServic } from "../Course/Course.Servic";
import { Course } from "../Course/Course.Model";
export class DaysService {
    private courseServic: CourseServic = new CourseServic();
    private curses: Course[] = [
        new Course("Math", 20, ["Sun", "Man"]),
        new Course("Web", 15, ["Tus", "Man"]),
    ];
    private Days: string[] = ["Sun", "Man", "Tus", "Wed", "Thu", "Fri", "Sat"];

    AddDayToCourse(courseId: number, day: string): void {
        const course: Course | undefined = this.courseServic.getById(courseId);
        if (course) {
            if (!course.DayesOfCoures) {
                course.DayesOfCoures = [];
            }
            course.DayesOfCoures.push(day);
        } else {
            console.error("Course not found");
            return;
        }
    }
    ChangeDayesOfCoures(courseId: number, newDays: string[]): void {
        const course: Course | undefined = this.courseServic.getById(courseId);
        if (course) {
            course.DayesOfCoures = newDays;
        }
        else {
             console.error("Course not found");
            return;
        }
    }

    DeleteDayToCourse(courseId: number, day: string): void {
        const course: Course | undefined = this.courseServic.getById(courseId);
        if (course) {
            if (!course.DayesOfCoures || !course.DayesOfCoures.includes(day)) {
                 console.error("Course not found");
            return;
            }
            course.DayesOfCoures = course.DayesOfCoures.filter(d => d !== day);
        }
        else {
            console.error("Course not found");
            return;
        }
    }
    allOrderByDay(): String[] | undefined {
        const result: String[] = [];
        for (const day of this.Days) {
            for (const course of this.curses) {
                if (course.DayesOfCoures.includes(day)) {
                    result.push(`Day: ${day}, Course: ${course.CourseName}`);
                }
            }
        }
        return result;
    }

    OrderByDay(Day: string): String[] | undefined {
        const answer: String[] = [];
        for (const course of this.curses) {
            if (course.DayesOfCoures.includes(Day)) {
                answer.push(`Course: ${course.CourseName}`);
            }
        }

        return answer;
    }




}
