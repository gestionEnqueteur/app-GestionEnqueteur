import Course from "../models/Course";
import MesureBSC from "../models/bsc/MesureBsc";
import StorageService from "./StorageServices";

export default class CourseService {
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  addStructureBsc(course: Course) {
    const mesure: MesureBSC = {
      infoEnqueteur: {},
      retards: {
        retardDepart: undefined,
        retardArrive: undefined
      }, 
      infoTrain: {
        composition: "US",
        numMaterial: "",
      },
      commentaireNoSuccess: "",
    };

    course.mesure = mesure; 
  }

  addStructure(course: Course) {
    switch (course.mission) {
      case "BSC HDF":
        this.addStructureBsc(course);
        break;
      case "MQ HDF":
        console.log("structure pour la MQ HDF");
        break;
      case "TEST":
        console.log("test ajout structure");
        break;
      default:
        console.log("structure non géré pour ce type de mission");
    }
    return course;
  }

  loadCourses() {
    //TODO: implémenter la fonction
    // on tente un Fetch, si pas de 4G (on récupere sur la db Téléphone )
    console.log("Chargement des courses depuis Storage Service");
    return this.storage
      .getAllCourse()
      .map((course) => this.addStructure(course));
  }
}
