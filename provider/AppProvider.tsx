import {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  useMemo,
  useEffect,
} from "react";
import AxiosService from "../services/AxiosService";
import StorageService from "../services/StorageServices";
import CourseService from "../services/CourseService";
import Course from "../models/Course";
import reducerCourse, { ActionCourse } from "../reducer/courseReducer";
import { useSetRecoilState } from "recoil";
import { configurationState } from "../store/storeAtom";

type Props = {
  children: ReactNode;
};

type StoreContextType = {
  state: Course[];
  dispatch: Dispatch<ActionCourse>;
};

// instance les services
const axiosService = new AxiosService("");
const storageService = new StorageService();
const courseService = new CourseService(storageService);

// création du state global courses 
let initialState: Course[] = [];
export const StoreCourseContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => {},
});

// création des context pour chaque service
export const AxiosContext = createContext<AxiosService>(axiosService);
export const StorageContext = createContext<StorageService>(storageService);
export const CourseContext = createContext<CourseService>(courseService);

export default function AppProvider(props: Readonly<Props>) {
  // Composant AppProvider

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

  // déclaration des states
  const [state, dispatch] = useReducer(reducerWithMiddleWare, initialState);
  const setConfiguration = useSetRecoilState(configurationState);

  useEffect(() => {
    // chargement des courses ( dans un reducer React )
    storageService.loadData("courses").then((courses) => {
      if (courses) dispatch({ type: "load", courses: courses });
    });

    // chargement de la configuration ( dans un state Recoil )
    storageService.loadData("configuration").then((configLoaded) => {
      if (configLoaded) setConfiguration(configLoaded);
    });
  }, []);

  const storeContextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreCourseContext.Provider value={storeContextValue}>
      <AxiosContext.Provider value={axiosService}>
        <StorageContext.Provider value={storageService}>
          <CourseContext.Provider value={courseService}>
            {props.children}
          </CourseContext.Provider>
        </StorageContext.Provider>
      </AxiosContext.Provider>
    </StoreCourseContext.Provider>
  );
}
