import Course from "./Course";

export default interface Vacation {
  id: number;
  affectation?: string;
  pds: string;
  vac: string;
  courses: Course[];
}
