import { ReactNode, createContext, useEffect, useMemo } from "react";
import ConfigurationService from "../services/ConfigurationService";
import AxiosService from "../services/AxiosService";
import StorageService from "../services/StorageServices";
import CourseService from "../services/CourseService";

type Props = {
  children: ReactNode;
};

export type AllServices = {
  configurationService: ConfigurationService;
  axiosService: AxiosService;
  courseService: CourseService;
  storageService: StorageService;
};
// création du context App
export const AppContext = createContext<any>(null);

// création des context pour chaque service
export const ConfigurationContext = createContext<
  ConfigurationService | undefined
>(undefined);
export const AxiosContext = createContext<AxiosService | undefined>(undefined);
export const StorageContext = createContext<StorageService | undefined>(
  undefined
);
export const CourseContext = createContext<CourseService | undefined>(
  undefined
);

export default function AppProvider(props: Props) {
  // création de l'instance Configuration service

  const configService = useMemo(
    () => new ConfigurationService({ urlApi: "", user: "" }),
    []
  );
  const axiosService = useMemo(() => new AxiosService(""), []);
  const storageService = useMemo(() => new StorageService(), []);
  const courseService = useMemo(() => new CourseService(storageService), []);

  const init = async () => {
    console.log("Init App");
    // Chargement la configuration dans le asyncStorage
    await configService.loadConfiguration();
    console.log(`urlApi: ${configService.getConfiguration().urlApi}`);
    console.log(`user: ${configService.getConfiguration().user}`);

    axiosService.setUrlApi(configService.getConfiguration().urlApi);
    console.log(axiosService.pingService());

    // Load les courses
    courseService.loadCourses();
  };

  useEffect(() => {
    // Init de l'application
    console.log("Mount: AppProvider");
    init();
  }, []);

  return (
    <ConfigurationContext.Provider value={configService}>
      <AxiosContext.Provider value={axiosService}>
        <StorageContext.Provider value={storageService}>
          <CourseContext.Provider value={courseService}>
            {props.children}
          </CourseContext.Provider>
        </StorageContext.Provider>
      </AxiosContext.Provider>
    </ConfigurationContext.Provider>
  );
}
