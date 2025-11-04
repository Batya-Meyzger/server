import { Course } from "./Course.Model";

export class CourseServic {
      private curses: Course[] = [
        new Course("java", 15, ["Sun", "Tus"]),
        new Course("c++", 10, ["Mon", "Wed"]),
    ];



  
    //CRUD
    //Create Read Update Delete
    getAll(): Course[] {
        return this.curses;
    }
      update(id: number, course: Course): Course | undefined {
        if (this.getById(id) == undefined)
            return undefined;
        const index = this.curses.findIndex(c => c.Courseid === id);
        this.curses[index].CourseName = course.CourseName;
        this.curses[index].Houres = course.Houres;
        this.curses[index].DayesOfCoures = course.DayesOfCoures;
        return this.curses[index];
    }

    getById(id: number): Course | undefined {
        return this.curses.find(c => c.Courseid === id);
    }

    remove(id: number): boolean {
        const index = this.curses.findIndex(c => c.Courseid === id);
        if (index !== -1) {
            this.curses.splice(index, 1);
            return true;
        }
        return false;
    }


    add(cource: Course): Course | undefined {
        if (this.getById(cource.Courseid) != undefined)
            return undefined;
        this.curses.push(cource);
        return cource;
    }

 
  


}