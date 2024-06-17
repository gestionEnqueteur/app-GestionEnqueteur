import Course from "../models/Course";
import CourseInterface from "../models/CourseInterface";
import StorageService from "../services/StorageServices";
import courseReducer, { ActionCourse } from "./courseReducer";

export function courseReducerWithSave(
  prevState: CourseInterface[],
  action: ActionCourse
) {
  // utilisation du reducer original
  const newState = courseReducer(prevState, action);

  // appel du middleware
  if (action.type !== "load") middlewareAfterUpdate(newState);

  return newState;
}

const middlewareAfterUpdate = (newState: CourseInterface[]) => {
  // on sauvegarde la data
  StorageService.saveData(newState, "courses");
};
