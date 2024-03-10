import { useRecoilState, useRecoilValue } from "recoil";
import { configurationState, coursesState } from "../store/storeAtom";
import CourseService from "../services/CourseService";
import axios from "axios";
import Course from "../models/Course";
import { useDispatchCourses } from "./useDispatchCourses";

export default function useSynchroApi(): {
  synchroApiPush: Function;
  synchroApiPull: Function;
} {
  const [listCourse, setListCourse] = useRecoilState(coursesState);
  const { urlApi } = useRecoilValue(configurationState);
  const dispatch = useDispatchCourses();

  if (!urlApi) {
    //TODO: avertir l'utilisateur de la non configuration
    console.warn("URL non configuré");
  }

  const synchroApiPush = () => {
    // fonction de synchro Api pour synchroniser tous les datas

    for (const course of listCourse) {
      // pour chaque course, synchro si modifié
      if (course.isSyncro) continue;

      const dataTransfert = CourseService.createDataTransfertObjet(course);
      axios
        .put(`${urlApi}/api/courses/${course.id}`, dataTransfert)
        .then((response) => {
          console.log(response);

          //TODO: faire la logique pour informer la bonne synchro ou echec
        })
        .catch((error) => console.error(error));
    }
  };

  const synchroApiPull = () => {
    console.log(`pull data from API`); 
    axios
      .get(`${urlApi}/api/courses?populate=*`)
      .then((response) => {
        //traitement de la réponse
        const listeCourseApiUnknown: unknown[] = response.data.data;

        // on itère sur les items de API
        for (const responseBrute of listeCourseApiUnknown) {
          // on essaye de les transformer en course
          const responseNet =
            CourseService.createObjetStateFromApi(responseBrute);
          if (
            responseNet &&
            listCourse.find((item) => responseNet.id === item.id) === undefined
          ) {
            // objet n'existe pas dans le state on peut le rajouter
            // ajout de la structure en fonction du type de course 
            const newCourse = CourseService.addStructure(responseNet);
            setListCourse(currentState => [...currentState, newCourse]); 
          }
        }
      })
      .catch((error) => console.error(error));
  };

  return { synchroApiPull, synchroApiPush };
}
