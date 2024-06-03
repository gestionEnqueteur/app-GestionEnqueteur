import { ReactNode, createContext, useEffect } from "react";
import AxiosService from "../services/AxiosService";
import StorageService from "../services/StorageServices";
import CourseService from "../services/CourseService";
import { useSetRecoilState } from "recoil";
import { configurationState } from "../store/storeAtom";
import { useDispatchCourses } from "../hook/useDispatchCourses";

type Props = {
  children: ReactNode;
};

// instance les services
const axiosService = new AxiosService("");
const storageService = new StorageService();
const courseService = new CourseService(storageService);

// création des context pour chaque service
export const AxiosContext = createContext<AxiosService>(axiosService);
export const StorageContext = createContext<StorageService>(storageService);
export const CourseContext = createContext<CourseService>(courseService);

export default function AppProvider(props: Readonly<Props>) {
  // Composant AppProvider

  // déclaration des states et dispatch
  const setConfiguration = useSetRecoilState(configurationState);
  const dispatchCourses = useDispatchCourses();

  useEffect(() => {
    // chargement des courses 
    storageService.loadData("courses").then((courses) => {
      if (courses) dispatchCourses({ type: "load", courses: courses });
    });

    // chargement de la configuration
    storageService.loadData("configuration").then((configLoaded) => {
      if (configLoaded) setConfiguration(configLoaded);
    });
  }, []);

  return (
    <AxiosContext.Provider value={axiosService}>
      <StorageContext.Provider value={storageService}>
        <CourseContext.Provider value={courseService}>
          {props.children}
        </CourseContext.Provider>
      </StorageContext.Provider>
    </AxiosContext.Provider>
  );
}
