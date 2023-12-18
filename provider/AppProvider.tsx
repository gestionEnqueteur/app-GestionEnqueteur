import { ReactNode, createContext, useReducer, Dispatch, useMemo } from "react";
import ConfigurationService from "../services/ConfigurationService";
import AxiosService from "../services/AxiosService";
import StorageService from "../services/StorageServices";
import CourseService from "../services/CourseService";
import Course from "../models/Course";
import reducerCourse, { ActionCourse } from "../reducer/courseReducer";

type Props = {
  children: ReactNode;
};

type StoreContextType = {
  state: Course[];
  dispatch: Dispatch<ActionCourse>;
};

// instance les services
const configService = new ConfigurationService({ urlApi: "", user: "" });
const axiosService = new AxiosService("");
const storageService = new StorageService();
const courseService = new CourseService(storageService);

// création du state global
const initialState: Course[] = [];
export const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => {},
});

// création des context pour chaque service
export const ConfigurationContext =
  createContext<ConfigurationService>(configService);
export const AxiosContext = createContext(axiosService);
export const StorageContext = createContext<StorageService>(storageService);
export const CourseContext = createContext<CourseService>(courseService);

// Init de l'application
const init = async () => {
  console.log("Init App");
  // Chargement la configuration dans le asyncStorage
  await configService.loadConfiguration();
  console.log(`urlApi: ${configService.getConfiguration().urlApi}`); // pour le test à supprimer
  console.log(`user: ${configService.getConfiguration().user}`); // pour le test à supprimer
  // Load les courses
  courseService.loadCourses();
};

init();

export default function AppProvider(props: Readonly<Props>) {
  // Composant AppProvider

  // le Reducer
  const [state, dispatch] = useReducer(reducerCourse, initialState);

  const storeContextValue = useMemo(() => ({state, dispatch}), [state] )

  return (
    <StoreContext.Provider value={storeContextValue}>
      <ConfigurationContext.Provider value={configService}>
        <AxiosContext.Provider value={axiosService}>
          <StorageContext.Provider value={storageService}>
            <CourseContext.Provider value={courseService}>
              {props.children}
            </CourseContext.Provider>
          </StorageContext.Provider>
        </AxiosContext.Provider>
      </ConfigurationContext.Provider>
    </StoreContext.Provider>
  );
}
