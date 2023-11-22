import Course from "../models/Course";
import StorageService from "./StorageServices";
import MesureBSC from "../models/bsc/MesureBsc";
import { CompositionEnum } from "../models/enum";

export default class CourseService {
  private storage: StorageService;
  private courses: Course[];

  constructor(storage: StorageService) {
    this.storage = storage;
    this.courses = [];
  }

  getCourses() {
    return this.courses;
  }

  getCourse(id: number): Course | undefined {
    return this.courses.find((item) => item.id === id);
  }

  updateCourse(course: Course) {
    const index = this.courses.findIndex((item) => item.id === course.id);
    if (index === -1) {
      // faire quelque chose pour le mauvais ID
      throw new Error(`pas de course trouver pour ID: ${course.id}`);
    }

    // on remplace la valeur
    this.courses[index] = course;
  }

  addMesureBscToCourse(course: Course) {
    const mesure: MesureBSC = {
      questionnaires: {
        vides: 0,
        distribuees: 0,
        inexploitables: 0
      },
      infoTrain: {
        composition: CompositionEnum.US,
        numMaterial: ""
      },
      infoEnqueteur: {}
    }

    course.mesure = mesure; 
  }

  addMesureAllCourse() {
    const newListCourse: Course[] = this.courses.map((course: Course) => {
      if (course.mission === "HDF BSC") {
        this.addMesureBscToCourse(course); 
      }
      return course; 
    }); 

    this.courses = newListCourse; 
  }

  loadCourses() {
    //TODO: implémenter la fonction
    // on tente un Fetch, si pas de 4G (on récupere sur la db Téléphone )
    console.log("Chargement des courses depuis Storage Service");
    this.courses = this.storage.getAllCourse();
    return this.courses;
  }
}
