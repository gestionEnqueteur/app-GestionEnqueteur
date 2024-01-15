import Course from "../models/Course";
import StorageService from "../services/StorageServices";
import courseReducer, { ActionCourse } from "./courseReducer";

export function courseReducerWithSave(
  prevState: Course[],
  action: ActionCourse
) {
  // utilisation du reducer original
  const newState = courseReducer(prevState, action);

  // appel du middleware
  if (action.type !== "load") middlewareAfterUpdate(newState);

  return newState;
}

const middlewareAfterUpdate = (newState: Course[]) => {
  // on instance le service
  const storageService = new StorageService();

  // on sauvegarde la data
  storageService.saveData(newState, "courses");
};
