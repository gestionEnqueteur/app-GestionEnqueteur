import Course from "../../models/Course";
import CourseInterface from "../../models/CourseInterface";
import Mesure from "../../models/Mesure";
import TestMock from "../../services/TestMock";



describe("Test la class Course", () => {
  
  const courseInterface: CourseInterface | undefined = TestMock.getCourses().find(
    (course) => course.mission === "BSC HDF"
  );

  if (courseInterface === undefined) {
    throw new Error("pas de course dans le mock"); 
  }


  const course = new Course(courseInterface); 

  test('course est une instance de Course', () => {
    expect(course).toBeInstanceOf(Course); 
  })

  
})
