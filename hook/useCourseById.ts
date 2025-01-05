import Course from "../models/Course";
import { useStoreZustand } from "../store/storeZustand";


export function useCourseById(id: number): Course {

  const listCourse = useStoreZustand(state => state.courses); 
  
  const course = listCourse.find(item => item.id === id); 
  if (!course) {
    throw new Error(`pas de course trouvé pour ID : ${id}`); 
  }
  return course; 
}