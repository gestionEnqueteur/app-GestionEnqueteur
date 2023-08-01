import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import Course from "../models/Course";
import TestMock from "../services/TestMock";
import { ConfigurationContext } from "./ConfigurationProvider";

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

    // test URL
    console.log(configuration);

    // chargement des data
    setListCourse(TestMock.getCourses());

    //TODO: adapter la fonction par rapport a API. pour le test.
  }, [configuration]);

  return (
    <CoursesContext.Provider value={{ listCourse, setListCourse }}>
      {props.children}
    </CoursesContext.Provider>
  );
}
