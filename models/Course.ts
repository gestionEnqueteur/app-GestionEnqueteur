import InfoHoraireCourse from "./InfoHoraireCourse";
import Ligne from "./Ligne";
import MesureBSC from "./bsc/MesureBsc";
import { StatusEnum } from "./enum";
import MesureMQ from "./mq/MesureMQ";
import MesureOD from "./od/MesureOD";

export default interface Course {
  id: number;
  missionType: string;
  infoHoraireCourse: InfoHoraireCourse;
  status: StatusEnum;
  ligne: Ligne;
  mesure?: MesureBSC | MesureMQ | MesureOD;
  service?: string;
  trainCourse: string;
  objectif: number;
  commentaire?: string;
}
