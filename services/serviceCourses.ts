import { enqAPI } from "../libs/axios";
import Course from "../models/Course";

export const getCourses = async (): Promise<Course[]> => {
  const courses: Course[] = [];
  try {
    const data = await enqAPI.get("/courses");
    for (const course of data.data.data) {
      const body: Course = {
        id: course.id,
        ...course.attributes,
      };
      courses.push(body);
    }
    return courses;
  } catch (err) {
    console.log(err);
    return courses;
  }
};
