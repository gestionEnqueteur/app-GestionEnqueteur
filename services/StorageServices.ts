import Course from "../models/Course";
import TestMock from "./TestMock";

export default class StorageService {
  saveCourse(course: Course) {
    //TODO: crée la méthode pour sauvergader une course.
  }

  getCourse() {
    //TODO: crée la méthode pour récuperer une course. dans la database.
  }

  getAllCourse() {
    //TODO: crée la méthode pour récuperer tout les courses dans la database.

    return TestMock.getCourses();
  }
}
