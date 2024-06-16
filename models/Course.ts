import InfoHoraireCourse from "./InfoHoraireCourse";
import { StatusEnum } from "./enum";
import CourseInterface from "./CourseInterface";
import ApiCourseResponse from "./ApiCourseResponse";



export default class Course implements CourseInterface {

  id!: number;
  mission!: string;
  pds!: string;
  vac!: string;
  affectation?: string;
  infoHoraireCourse?: InfoHoraireCourse;
  status!: StatusEnum;
  ligne?: string;
  service?: string;
  isSynchro!: boolean;
  trainCourse?: string;
  objectif?: number;
  commentaire?: string;
  mesure?: {};

  constructor(course: CourseInterface) {
    Object.assign(this, course);
  }

  toJson(): CourseInterface {
    return { ...this }
  }

  convertDataToApi() {
    const dataTransfert = {
      mission: this.mission,
      trainCourse: this.trainCourse,
      commentaire: this.commentaire,
      ligne: this.ligne,
      status: this.status,
      objectif: this.objectif,
      service: this.service,
      hd: this.infoHoraireCourse?.datetimeDepartEnq,
      ha: this.infoHoraireCourse?.datetimeArriveEnq,
      placeDeparture: this.infoHoraireCourse?.gareDepartEnq,
      placeArrival: this.infoHoraireCourse?.gareArriveEnq,
    }

    return dataTransfert; 
  }

  static createCourseFromApi(dataApi: unknown): Course {
    if (!this.isValidReponseApi(dataApi)) {
      throw new Error("Format incorrect");
    }

    const newCourse: CourseInterface = {
      id: dataApi.id,
      mission: dataApi.attributes.mission,
      vac: "X",
      pds: "X",
      ligne: dataApi.attributes.ligne,
      trainCourse: dataApi.attributes.trainCourse,
      status: StatusEnum.DRAFT, // TODO: a modifié
      objectif: dataApi.attributes.objectif,
      isSynchro: true,
      infoHoraireCourse: {
        gareDepartEnq:
          dataApi.attributes.placeDeparture,
        gareArriveEnq:
          dataApi.attributes.placeArrival,
        datetimeDepartEnq:
          dataApi.attributes.hd,
        datetimeArriveEnq:
          dataApi.attributes.ha,
      }
    }

    return new Course(newCourse);

  }

  static isValidReponseApi(response: unknown): response is ApiCourseResponse {
    console.log("type guarde de course : "); 
    console.log(response);

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
      typeof attrs.hd === "string" &&
      typeof attrs.ha === "string"

    )

  }
}
