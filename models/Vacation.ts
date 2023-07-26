import Course from "./Course";
import User from "./User";

export default interface Vacation {
  id: number;
  affectation: User;
  pds: string;
  vacNumber: string;
  courses: Course[];
}
