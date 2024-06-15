import Course from "../models/Course";

export type ActionCourse =
  | { type: "update"; course: Course }
  | { type: "delete"; course: Course }
  | { type: "add"; course: Course | Course[] }
  | { type: "load"; courses: Course[] }
  | { type: "reset" };

export default function courseReducer(state: Course[], action: ActionCourse) {
  let newState: Course[];

  switch (action.type) {
    case "add":
      newState = addCourse(state, action.course);
      return newState;

    case "delete":
      newState = state.filter((item) => item.id !== action.course.id);
      return newState;

    case "update":
      newState = state.map((item) =>
        item.id === action.course.id
          ? { ...action.course, isSyncro: false }
          : item
      );
      console.log("action update");
      return newState;

    case "load":
      newState = action.courses;
      return newState;

    case "reset":
      newState = [];
      return newState;

    default:
      return state;
  }
}

// méthode interne pour le reducer
function addCourse(prevState: Course[], courses: Course | Course[]) {
  // on vérifie le type
  if (courses instanceof Array) {
    // c'est un array
    const newListCourse: Course[] = [];
    // vérification des doublon
    for (const course of courses) {
      if (prevState.find((item) => item.id === course.id) === undefined) {
        newListCourse.push(course);
      }
    }
    return [...prevState, ...newListCourse];
  } else if (prevState.find((item) => item.id === courses.id) === undefined) {
    return [...prevState, courses];
  }
  console.warn("duplication ID"); 
  return prevState;
}
