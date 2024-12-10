import { ReactNode, useEffect } from "react";
import StorageService from "../services/StorageServices";
import { useSetRecoilState } from "recoil";
import { configurationState } from "../store/storeAtom";
import { useDispatchCourses } from "../hook/useDispatchCourses";

type Props = {
  children: ReactNode;
};

export default function AppProvider(props: Readonly<Props>) {
  // Composant AppProvider

  // déclaration des states et dispatch
  const setConfiguration = useSetRecoilState(configurationState);
  const dispatchCourses = useDispatchCourses();

  useEffect(() => {
    // chargement des courses
    StorageService.loadData("courses").then((courses) => {
      if (courses) dispatchCourses({ type: "load", courses: courses });
    });

    // chargement de la configuration
    StorageService.loadData("configuration").then((configLoaded) => {
      if (configLoaded) setConfiguration(configLoaded);
    });
  }, []);

  return <>{props.children}</>;
}
