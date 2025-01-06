import Course from "../models/Course";
import useApi from "../hook/useApi";
import Mesure from "../models/Mesure";
import { useStoreZustand } from "../store/storeZustand";
import courseReducer from "../reducer/courseReducer";

export default function useSynchroApi(): {
  synchroApiPush: () => Promise<void>;
  synchroApiPull: () => Promise<void>;
} {
  const { urlApi, listCourse, dispatch, courseData } = useStoreZustand(
    (state) => ({
      urlApi: state.urlApi,
      listCourse: state.courses,
      dispatch: state.dispatchCourse,
      courseData: state.coursesData,
    })
  );

  const api = useApi();

  if (!urlApi) {
    //TODO: avertir l'utilisateur de la non configuration
    //console.warn("URL non configuré");
  }

  const synchroApiPush = async () => {
    // Envoi des mesures
    const coursesNotSynchronised = listCourse.filter(
      (course) => course.isSynchro === false
    );
    const coursesIdCourseSynchronised: number[] = [];

    for (const course of coursesNotSynchronised) {
      const mesure: Mesure | undefined = course.mesure;

      if (!mesure) continue;

      const dataToSend = {
        data: {
          mesure: [mesure.convertDataToApi()],
          course: course.id,
        },
      };
      console.log(dataToSend);
      try {
        const responseApi = await api.post(`/api/mesures`, dataToSend);
        coursesIdCourseSynchronised.push(course.id);

        console.log(responseApi);
      } catch (error) {
        console.log(error);
      }
    }

    // passage de isSynchro a true pour les courses synchronisé
    dispatch({ type: "synchro", coursesId: coursesIdCourseSynchronised });
  };

  const synchroApiPull = async () => {
    try {
      console.log(`pull data from API`);
      //TODO: par la suite, récuperer que les data de l'utilisateur
      const response = await api.get(`/api/courses?populate=*`);

      const newListCourse: Course[] = [];
      const cousesToUpdate: Course[] = [];

      //traitement de la réponse
      const listeCourseApiUnknown: unknown[] = response.data.data; // ajout vérification
      // on itère sur les items de API
      for (const responseBrute of listeCourseApiUnknown) {
        // on essaye de les transformer en course
        const courseFromApi = Course.createCourseFromApi(responseBrute);
        const courseFromZustand = listCourse.find(
          (item) => courseFromApi.id === item.id
        );

        if (courseFromZustand) {
          // objet n'existe on vérifie la date de mise a jour
          if (courseFromZustand.updatedAt !== courseFromApi.updatedAt) {
            // les date ne sont pas synchro, on le met dans la liste des course a updater
            cousesToUpdate.push(courseFromApi);
          }
        } else {
          // la course n'est pas dans le store Zustand, on le rajoute dans la liste
          courseFromApi.isSynchro = true;
          newListCourse.push(courseFromApi);
        }
      }
      const prevStateCourse = courseData;
      let newStateCourse = courseReducer(prevStateCourse, {
        type: "add",
        course: newListCourse,
      });
      newStateCourse = courseReducer(newStateCourse, {
        type: "updateApi",
        courses: cousesToUpdate,
      });

      // a la toute fin on met à jour le state en remplacement le state complet.
      dispatch({ type: "load", courses: newStateCourse });
    } catch (error) {
      console.error(`erreur dans le pullSynchro: ${error}`);
    }
  };

  return { synchroApiPull, synchroApiPush };
}
