import { atom, selector } from "recoil";

// import des types
import ConfigurationType from "../models/ConfigurationType";
import Course from "../models/Course";

// création du state configuration
export const configurationState = atom<ConfigurationType>({
  key: 'configurationState', 
  default: {urlApi: "", user: ""},
}); 

// création du state(objet) qui contient la liste courses (toutes les courses)
export const coursesState = atom<Course[]>({
  key: 'coursesState', //propriété interne
  default: [], //Propriété contenant la valeur par défaut de l'état
}); 

// petit test d'un selecteur pour filtrage des Courses avec seulement BSC
export const coursesBscSelector = selector({
  key: 'coursesBscSelector',
  get: ({get}) => {
    const courses = get(coursesState); 

    return courses.filter((item) => item.mission === "BSC HDF"); 
  }
})

