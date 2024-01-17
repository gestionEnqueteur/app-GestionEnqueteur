import InfoHoraireCourse from "./InfoHoraireCourse";
import { StatusEnum } from "./enum";

export default interface Course {
  id: number;
  mission: string;
  pds: string;
  vac: string;
  affectation?: string;
  infoHoraireCourse?: InfoHoraireCourse;
  status?: StatusEnum;
  ligne?: string;
  service?: string;
  trainCourse?: string;
  objectif?: number;
  commentaire?: string;
}
