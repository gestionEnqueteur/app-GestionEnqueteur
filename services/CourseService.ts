import Course from "../models/Course";
import MesureBSC from "../models/bsc/MesureBsc";
import StorageService from "./StorageServices";

export default class CourseService {
  
  static addStructureBsc(course: Course) {
    const mesure: MesureBSC = {
      infoEnqueteur: {},
      retards: {
        retardDepart: undefined,
        retardArrive: undefined,
      },
      infoTrain: {
        composition: "US",
        numMaterial: "",
      },
      commentaireNoSuccess: "",
    };

    course.mesure = mesure;
  }

  static addStructure(course: Course) {
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

  static createDataTransfertObjet(course: Course) {
    const dataTransfert = {
      mission: course.mission,
      status: "DRAFT",
      ligne: course.ligne,
      trainCourse: course.trainCourse,
      commentaire: course.commentaire,
      infoHoraireCourse: {
        gareDepartEnq: course.infoHoraireCourse?.gareDepartEnq,
        gareArriveEnq: course.infoHoraireCourse?.gareArriveEnq,
        datetimeDepartEnq: course.infoHoraireCourse?.datetimeDepartEnq,
        datetimeArriveEnq: course.infoHoraireCourse?.datetimeArriveEnq,
      },
    };

    return dataTransfert; 
  }

  static loadCourses() {
    //TODO: implémenter la fonction
    // on tente un Fetch, si pas de 4G (on récupere sur la db Téléphone )
    console.log("Chargement des courses depuis Storage Service");
    return StorageService.getAllCourse().map((course) =>
      CourseService.addStructure(course)
    );
  }
}
