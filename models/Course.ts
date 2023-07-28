import InfoHoraireCourse from "./InfoHoraireCourse";
import MesureBSC from "./bsc/MesureBsc";
import { StatusEnum } from "./enum";
import MesureMQ from "./mq/MesureMQ";
import MesureOD from "./od/MesureOD";

export default interface Course {
  id: number;
  mission: string;
  pds?: string;
  vac?: string;
  affectation?: string;
  infoHoraireCourse?: InfoHoraireCourse;
  status?: StatusEnum;
  ligne?: string;
  mesure?: MesureBSC | MesureMQ | MesureOD;
  service?: string;
  trainCourse?: string;
  objectif?: number;
  commentaire?: string;
}
