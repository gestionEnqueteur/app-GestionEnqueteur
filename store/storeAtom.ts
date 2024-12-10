import { atom, selector } from "recoil";

// import des types
import ConfigurationType from "../models/ConfigurationType";
import Course from "../models/Course";
import { SnackbarProps } from "react-native-paper";
import User from "../models/User";
import CourseInterface from "../models/CourseInterface";

// création du state configuration
export const configurationState = atom<ConfigurationType>({
  key: 'configurationState',
  default: { urlApi: "", user: "" },
});

// création du state liste courses 
export const coursesState = atom<CourseInterface[]>({
  key: 'coursesState',
  default: [],
});

// CommunSnackBar
export const snackBarState = atom<SnackbarProps>({
  key: "snackBarState",
  default: {
    visible: false,
    children: "Hello World",
    onDismiss: () => console.error("Doit etre redéfinir"),
  },
});

export const userState = atom<User | undefined>({
  key: 'userState',
  default: undefined
})

export const jwtState = atom<string | undefined>({
  key: 'jwtState',
  default: undefined
})


// récupération de tous les courses avec instenciation de l'objet Course
export const courseAllSelector = selector({
  key: 'courseAllSelector',
  get: ({ get }) => {
    console.log("intanciation des objet");
    const courses: CourseInterface[] = get(coursesState);
    return courses.map(course => new Course(course));
  }
})


// petit test d'un selecteur pour filtrage des Courses avec seulement BSC
export const coursesBscSelector = selector({
  key: 'coursesBscSelector',
  get: ({ get }) => {
    const courses = get(courseAllSelector);

    return courses.filter((item) => item.mission === "BSC HDF");
  }
})

