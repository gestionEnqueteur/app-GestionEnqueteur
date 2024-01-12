import { useRecoilState } from "recoil";
import courseReducer, { ActionCourse } from "../reducer/courseReducer";
import { coursesState } from "../store/storeAtom";

export function useDipatchCourses(): (action: ActionCourse) => void {
  // récupération du state Recoil
  const [courses, setCourses] = useRecoilState(coursesState);

  const dispatch = (action: ActionCourse) => {
    const nextState = courseReducer(courses, action);
    setCourses(nextState);
  };

  // on retourne le dispatch
  return dispatch;
}
