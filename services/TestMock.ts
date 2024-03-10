import planning from "../mock/planning.json";
import Course from "../models/Course";
import { StatusEnum } from "../models/enum";

export default class TestMock {
  static getCourses(): Course[] {
    let count = 1;
    const listCourse = planning.map((coursePlanning) => {
      const course: Course = {
        id: count,
        isSyncro: true,
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
