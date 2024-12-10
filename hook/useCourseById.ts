import { useRecoilValue } from "recoil";
import Course from "../models/Course";
import { courseAllSelector } from "../store/storeAtom";


export function useCourseById(id: number): Course {

  const listCourse = useRecoilValue(courseAllSelector); 
  
  const course = listCourse.find(item => item.id === id); 
  if (!course) {
    throw new Error(`pas de course trouvé pour ID : ${id}`); 
  }
  return course; 
}