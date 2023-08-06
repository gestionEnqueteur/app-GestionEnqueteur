import Course from "../models/Course";
import StorageService from "./StorageServices";

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

  updateCourse(id: number, course: Course) {
    //TODO: update la course.
    // récupérer la course en fonction de ID de l'objet.
    // changer  la valeur du tableau.
    // enregistrer dans la Db du téléphone
  }

  loadCourses() {
    //TODO: implémenter la fonction
    // on tente un Fetch, si pas de 4G (on récupere sur la db Téléphone )
    console.log("Chargement des courses depuis Storage Service");
    this.courses = this.storage.getAllCourse();
    return this.courses;
  }
}