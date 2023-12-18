import Course from "../models/Course";

export type ActionCourse =
  | { type: "update"; course: Course }
  | { type: "delete"; course: Course }
  | { type: "add"; course: Course };

export default function reducerCourse(state: Course[], action: ActionCourse) {
  let newState: Course[];

  switch (action.type) {
    case "add":
      newState = [...state, action.course];
      return newState;

    case "delete":
      newState = state.filter((item) => item.id !== action.course.id);
      return newState;

    case "update":
      newState = state.map((item) =>
        item.id === action.course.id ? action.course : item
      );
      return newState;

    default:
      return state;
  }
}
