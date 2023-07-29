import { ReactNode, createContext, useState, useEffect } from "react";
import ConfigurationType from "../models/ConfigurationType";
import { getCourses } from "../services/serviceCourses";
import Course from "../models/Course";
import { getConfiguration } from "../services/serviceConfiguration";

type Props = {
  children: ReactNode;
};

// création du context
export const ConfigurationContext = createContext<any | null>(null);

export default function ConfigurationProvider(props: Props) {
  const [configuration, setConfiguration] = useState<ConfigurationType>({
    urlApi: "",
    user: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // chargement de la configuration dans le context ConfigurationProvider
    try {
      getConfiguration().then((storedConfig: ConfigurationType) => {
        if (storedConfig !== null) setConfiguration(storedConfig);
      });
    } catch (e) {
      // ici on va gerer l'erreur en cas d'échec
      console.log("Echec du chargement de la configuration");
    }
    try {
      getCourses().then((courses: Course[]) => setCourses(courses));
    } catch (e) {}
  }, []);

  return (
    <ConfigurationContext.Provider
      value={{ configuration, setConfiguration, courses, setCourses }}
    >
      {props.children}
    </ConfigurationContext.Provider>
  );
}
