import axios from "axios";

import Course from "../models/Course";
import TestMock from "./TestMock";

export const getCourses = async (url: string): Promise<Course[]> => {
  let courses: Course[] = [];
  try {
    const data = await axios.get(`${url}/api/courses`);
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
    courses = TestMock.getCourses();
    return courses;
  }
};
