import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import Course from "../models/Course";
import { Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { coursesBscSelector, coursesState } from "../store/storeAtom";
import { useDispatchCourses } from "../hook/useDispatchCourses";
import { CourseContext } from "../provider/AppProvider";
import { useContext } from "react";

export default function TrainPlanifieScreen() {
  const stateCourses = useRecoilValue(coursesState);
  const selectorCourses = useRecoilValue(coursesBscSelector); 
  const dispatchCourses = useDispatchCourses();
  const courseService = useContext(CourseContext);

  const renderItem = ({ item }: { item: Course }) => (
    <DetailCourse course={item} />
  );
  
  const handleOnRefresh = async () => {    
    console.log("refresh");
    dispatchCourses({ type: "load", courses: courseService.loadCourses() });
    //TODO: courseService.loadCourses est un échaffauge, a refactoriser par la suite. 
  };
  

  return (
    <FlatList
      data={selectorCourses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={handleOnRefresh}
      refreshing={false}
      ListEmptyComponent={<Text>La liste est vide </Text>}
    />
  );
}
