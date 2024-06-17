import planning from "../mock/planning.json";
import CourseInterface from "../models/CourseInterface";
import { StatusEnum } from "../models/enum";

export default class TestMock {
  static getCourses(): CourseInterface[] {
    let count = 1;
    const listCourse = planning.map((coursePlanning) => {
      const course: CourseInterface = {
        id: count,
        isSynchro: true,
        mission: coursePlanning.mission,
        pds: coursePlanning.pds,
        vac: coursePlanning.vac,
        affectation: coursePlanning.affectation,
        status: StatusEnum.DRAFT,
        ligne: coursePlanning.ligne,
        trainCourse: coursePlanning.trainCourse,
        objectif: coursePlanning.prQuota,
        infoHoraireCourse: {
          datetimeArriveEnq: coursePlanning.ha,
          datetimeDepartEnq: coursePlanning.hd,
          gareDepartEnq: coursePlanning.depart,
          gareArriveEnq: coursePlanning.arrivee,
        },
      };

      // incrementer mon compteur
      count++;
      //
      return course;
    });

    return listCourse;
  }
}
