
export class Course {
  private static nextId = 1; 

        public Courseid: number;
        public CourseName: string;
        public Houres: number;
        public DayesOfCoures: string[];

  constructor(CourseName: string, NumOfHoures: number, DayesOfCoures: string[]) {
    this.Courseid = Course.nextId++; 
    this.CourseName =CourseName ;
    this.Houres = NumOfHoures;
    this.DayesOfCoures = DayesOfCoures;
  }
}
   