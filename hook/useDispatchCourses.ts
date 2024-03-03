import { useRecoilState } from "recoil";
import { ActionCourse } from "../reducer/courseReducer";
import { coursesState } from "../store/storeAtom";
import { courseReducerWithSave } from "../reducer/courseReducerWithSave";

export function useDispatchCourses(): (action: ActionCourse) => void {
  // récupération du state Recoil
  const [courses, setCourses] = useRecoilState(coursesState);

  const dispatch = (action: ActionCourse) => {
    const nextState = courseReducerWithSave(courses, action);
    setCourses(nextState);
  };

  // on retourne le dispatch
  return dispatch;
}
