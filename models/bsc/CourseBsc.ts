import { immerable } from 'immer';
import Course from '../Course'
import CourseInterface from '../CourseInterface'
import MesureBsc from './MesureBsc'

export default class CourseBsc extends Course {

   static readonly [immerable] = true;

  constructor(course: CourseInterface) {
    super(course); 

    if (!(this.mesure instanceof MesureBsc)) {
      throw new Error("Mesure invalide, doit etre de type MesureBsc"); 
    }
  }
}

