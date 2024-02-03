import Course from "../Course";
import InfoHoraireCourse from "../InfoHoraireCourse";
import MesureBSC from "./MesureBsc";


export default interface CourseBsc extends Course {
  mesure: MesureBSC;
  ligne: string;
  infoHoraireCourse: InfoHoraireCourse;
  trainCourse: string;
}