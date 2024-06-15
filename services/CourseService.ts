import ApiCourseResponse from "../models/ApiCourseResponse";
import Course from "../models/Course";
import MesureBSC from "../models/bsc/MesureBsc";
import { StatusEnum } from "../models/enum";
import StorageService from "./StorageServices";

export function isValidApiResponse(response: unknown): response is ApiCourseResponse {
  if (typeof response !== 'object' || response === null) return false;

  const obj = response as Record<string, unknown>;
  const attributes = obj.attributes;
  if (typeof attributes !== 'object' || attributes === null) return false;

  const attrs = attributes as Record<string, unknown>;

  return (
    'attributes' in response &&
    typeof attrs.mission === "string" &&
    (typeof attrs.trainCourse === "string" || attrs.trainCourse === null) &&
    (typeof attrs.commentaire === "string" || attrs.commentaire === null) &&
    (typeof attrs.ligne === "string" || attrs.ligne === null) &&
    typeof attrs.status === "string" &&
    (typeof attrs.objectif === "number" || attrs.objectif === null) &&
    typeof attrs.service === "string" &&
    typeof attrs.hd === "string" &&
    typeof attrs.ha === "string"

  )

}

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
    return course
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
      trainCourse: course.trainCourse,
      commentaire: course.commentaire,
      ligne: course.ligne,
      status: course.status,
      objectif: course.objectif,
      service: course.service,
      hd: course.infoHoraireCourse?.datetimeDepartEnq,
      ha: course.infoHoraireCourse?.datetimeArriveEnq,
      placeDeparture: course.infoHoraireCourse?.gareDepartEnq,
      placeArrival: course.infoHoraireCourse?.gareArriveEnq,
    };

    return dataTransfert;
  };



  static createObjetStateFromApi(dataApi: unknown): Course {
    if (isValidApiResponse(dataApi)) {
      // on sais que la réponse est de type ApiResponse
      const course: Course = {
        id: dataApi.id,
        mission: dataApi.attributes.mission,
        vac: "X", 
        pds: "X",
        ligne: dataApi.attributes.ligne,
        trainCourse: dataApi.attributes.trainCourse,
        status: StatusEnum.DRAFT, // TODO: a modifié
        objectif: dataApi.attributes.objectif,
        isSyncro: true,
        infoHoraireCourse: {
          gareDepartEnq:
            dataApi.attributes.placeDeparture,
          gareArriveEnq:
            dataApi.attributes.placeArrival,
          datetimeDepartEnq:
            dataApi.attributes.hd,
          datetimeArriveEnq:
            dataApi.attributes.ha,
        },
      };
      return course;
    } else {
      throw new Error("Type invalide");
    }
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
