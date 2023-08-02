import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import Course from "../models/Course";
import { ConfigurationContext } from "./ConfigurationProvider";
import { getCourses } from "../services/CourseService";

type Props = {
  children: ReactNode;
};

export default function CourseProvider(props: Props) {
  const [listCourse, setListCourse] = useState<Course[]>([]);

  const CoursesContext = createContext<any>(listCourse);

  // pour le test de URL API:
  const configuration = useContext(ConfigurationContext);

  useEffect(() => {
    // Init de l'application

    // chargement des data
    getCourses(configuration.configuration.urlApi).then((courses: Course[]) =>
      setListCourse(courses)
    );
  }, [configuration]);

  return (
    <CoursesContext.Provider value={{ listCourse, setListCourse }}>
      {props.children}
    </CoursesContext.Provider>
  );
}
