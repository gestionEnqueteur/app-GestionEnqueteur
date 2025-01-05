import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import Course from '../models/Course'
import courseReducer, { ActionCourse } from '../reducer/courseReducer'

import { SnackbarProps } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CourseInterface from '../models/CourseInterface'

type StoreState = {
  coursesData: CourseInterface[];
  jwt: string | undefined;
  urlApi: string;
  mainSnackBarProp: SnackbarProps;
  courses: Course[];
}

type StoreAction = {
  dispatchCourse: (action: ActionCourse) => void;
  setJwt: (token: string) => void;
  setUrlApi: (url: string) => void;
  setMainSnackBarProp: (props: SnackbarProps) => void;
}


type StoreZustand = StoreState & StoreAction

const functionCreator: StateCreator<StoreZustand> = (set) => ({
  // Courses 
  coursesData: [],
  courses: [],
  dispatchCourse: (action: ActionCourse) => set((state) => {
    const updatedCoursesData = courseReducer(state.coursesData, action);
    return {
      coursesData: updatedCoursesData,
      courses: updatedCoursesData.map(item => new Course(item))
    }
  }),

  // Token JWT
  jwt: undefined,
  setJwt: (token: string) => set({ jwt: token }),
  // snackBar 
  mainSnackBarProp:
  {
    visible: false,
    children: "Hello World",
    onDismiss: () => console.error("Doit etre redéfinir"),
  },
  setMainSnackBarProp: (snackBar: SnackbarProps) => set({ mainSnackBarProp: snackBar }),
  // URL Api 
  urlApi: "",
  setUrlApi: (urlApi: string) => set({ urlApi: urlApi }),
}
)

export const useStoreZustand = create<StoreZustand>()(
  persist(
    functionCreator,
    {
      name: 'store-zustand',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        coursesData: state.coursesData,
        jwt: state.jwt,
        urlApi: state.urlApi
      }),
      onRehydrateStorage: () => state => {
        console.log("Hydrate Storage");
        if (state?.coursesData) {
          state.courses = state.coursesData.map(item => new Course(item));
        }
      }

    }
  )
);
