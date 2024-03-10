import ApiResponse from "./ApiResponse";

export default interface ApiCourseResponse {
  id: number;
  attributes: {
    mission: string;
    status: "DRAFT";
    ligne: string;
    trainCourse: string;
    objectif: number;
    mesure: string;
    commentaire: string;
    infoHoraireCourse: {
      gareDepartEnq: string;
      gareArriveEnq: string;
      datetimeDepartEnq: string;
      datetimeArriveEnq: string;
    };
  };
}
