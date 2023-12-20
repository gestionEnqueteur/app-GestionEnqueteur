import {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  useMemo,
  useEffect,
} from "react";
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
let initialState: Course[] = [];
export const StoreCourseContext = createContext<StoreContextType>({
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
};

init();

export default function AppProvider(props: Readonly<Props>) {
  // Composant AppProvider

  const loadCourses = async () => {
    const loadedCourses: Course[] = await storageService.loadData("courses");
    return loadedCourses;
  };

  const reducerWithMiddleWare = (prevState: Course[], action: ActionCourse) => {
    // utilisation du reducer original
    const newState = reducerCourse(prevState, action);

    // appel du middleware
    if (action.type !== "load") middlewareAfterUpdate(newState);

    return newState;
  };

  const middlewareAfterUpdate = (newState: Course[]) => {
    // on sauvegarde la data
    storageService.saveData(newState, "courses");
  };
  // le store Course
  const [state, dispatch] = useReducer(reducerWithMiddleWare, initialState);

  useEffect(() => {
    // chargement des courses
    loadCourses().then((courses) => {
      if (courses) dispatch({ type: "load", courses: courses });
    });
  }, []);

  const storeContextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreCourseContext.Provider value={storeContextValue}>
      <ConfigurationContext.Provider value={configService}>
        <AxiosContext.Provider value={axiosService}>
          <StorageContext.Provider value={storageService}>
            <CourseContext.Provider value={courseService}>
              {props.children}
            </CourseContext.Provider>
          </StorageContext.Provider>
        </AxiosContext.Provider>
      </ConfigurationContext.Provider>
    </StoreCourseContext.Provider>
  );
}
