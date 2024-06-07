import { atom, selector } from "recoil";

// import des types
import ConfigurationType from "../models/ConfigurationType";
import Course from "../models/Course";
import { SnackbarProps } from "react-native-paper";

// création du state configuration
export const configurationState = atom<ConfigurationType>({
  key: 'configurationState',
  default: { urlApi: "", user: "" },
});

// création du state liste courses 
export const coursesState = atom<Course[]>({
  key: 'coursesState',
  default: [],
});

// CommunSnackBar
export const snackBarState = atom<SnackbarProps>({
  key: "snackBarStarte",
  default: {
    visible: false,
    children: "Hello World",
    onDismiss: () => console.error("Doit etre redéfinir"),
  },
})


// petit test d'un selecteur pour filtrage des Courses avec seulement BSC
export const coursesBscSelector = selector({
  key: 'coursesBscSelector',
  get: ({ get }) => {
    const courses = get(coursesState);

    return courses.filter((item) => item.mission === "BSC HDF");
  }
})

