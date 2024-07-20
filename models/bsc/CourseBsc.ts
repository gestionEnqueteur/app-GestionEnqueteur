import Course from '../Course'
import CourseInterface from '../CourseInterface'
import InfoHoraireCourse from '../InfoHoraireCourse';
import MesureBsc from './MesureBsc'

export default class CourseBsc extends Course {
   declare mesure: MesureBsc;
   declare infoHoraireCourse: InfoHoraireCourse; 
   declare ligne: string;

  constructor(course: CourseInterface) {
    super(course); 

    if (!(course.mesure instanceof MesureBsc)) {
      throw new Error("Mesure invalide, doit etre de type MesureBsc"); 
    }
  }
}

