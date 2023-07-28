import Course from "./Course";
import User from "./User";

export default interface Vacation {
  id: number;
  affectation?: User;
  pds: string;
  vac: string;
  courses: Course[];
}
