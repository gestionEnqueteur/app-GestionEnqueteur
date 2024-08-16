import { useRecoilValue } from "recoil";
import { configurationState, courseAllSelector } from "../store/storeAtom";
import Course from "../models/Course";
import { useDispatchCourses } from "./useDispatchCourses";
import useApi from '../hook/useApi'
import Mesure from "../models/Mesure";

export default function useSynchroApi(): {
  synchroApiPush: Function;
  synchroApiPull: Function;
} {
  const listCourse = useRecoilValue(courseAllSelector);
  const { urlApi } = useRecoilValue(configurationState);
  const dispatch = useDispatchCourses();

  const api = useApi();

  if (!urlApi) {
    //TODO: avertir l'utilisateur de la non configuration
    console.warn("URL non configuré");
  }

  const synchroApiPush = async () => {
    // Envoi des mesures 
    const coursesNotSynchronised = listCourse.filter((course) => course.isSynchro === false);
    const coursesIdCourseSynchronised: number[] = [];

    for (const course of coursesNotSynchronised) {
      const mesure: Mesure | undefined = course.mesure;

      if (!mesure) continue;

      const dataToSend = {
        data: {
          mesure: [mesure.convertDataToApi()],
          course: course.id
        },
      }
      console.log(dataToSend);
      try {
        const responseApi = await api.post(`/api/mesures`, dataToSend);
        coursesIdCourseSynchronised.push(course.id);

        console.log(responseApi);
      }
      catch (error) {
        console.log(error);
      }

    }

    // passage de isSynchro a true pour les courses synchronisé 
    console.log(coursesIdCourseSynchronised);
    dispatch({ type: "synchro", coursesId: coursesIdCourseSynchronised });

  };

  const synchroApiPull = async () => {
    console.log(`pull data from API`);
    const response = await api.get(`/api/courses?populate=*`);

    console.log(response.data.data); // résultat non récupérer car non attendu

    const newListCourse: Course[] = [];

    //traitement de la réponse
    const listeCourseApiUnknown: unknown[] = response.data.data; // ajout vérification 

    // on itère sur les items de API
    for (const responseBrute of listeCourseApiUnknown) {
      // on essaye de les transformer en course
      const responseNet = Course.createCourseFromApi(responseBrute);
      if (
        responseNet &&
        listCourse.find((item) => responseNet.id === item.id) === undefined
      ) {
        // objet n'existe pas dans le state on peut le rajouter
        // ajout de la structure en fonction du type de course
        const newCourse = new Course(responseNet);
        newCourse.isSynchro = true;  //TODO: a refactoriser 
        newListCourse.push(newCourse);
      }
    }

    // a la toute fin on met à jour le state
    dispatch({ type: "add", course: newListCourse });
  };

  return { synchroApiPull, synchroApiPush };
}
