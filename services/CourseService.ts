import axios from "axios";

import Course from "../models/Course";
import TestMock from "./TestMock";
import ConfigurationType from "../models/ConfigurationType";

export default class CourseService {
  private configuration: ConfigurationType;
  private courses: Course[];

  constructor(configuration: ConfigurationType) {
    this.configuration = configuration;
    this.courses = [];
  }

  getCourses() {
    return this.courses;
  }

  updateCourse(id: number, course: Course) {
    //TODO: update la course.
    // récupérer la course en fonction de ID de l'objet.
    // changer  la valeur du tableau.
    // enregistrer dans la Db du téléphone
  }
}
