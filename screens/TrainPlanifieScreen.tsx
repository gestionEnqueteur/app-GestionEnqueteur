import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import Course from "../models/Course";
import { Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { courseAllSelector } from "../store/storeAtom";
import { useDispatchCourses } from "../hook/useDispatchCourses";
import CourseInterface from "../models/CourseInterface";
import TestMock from "../services/TestMock";

export default function TrainPlanifieScreen() {
  const selectorCourses = useRecoilValue(courseAllSelector); 
  const dispatchCourses = useDispatchCourses();

  const renderItem = ({ item }: { item: Course }) => (
    <DetailCourse course={item} />
  );

  const handleOnRefresh = async () => {
    console.log("refresh");

    const newcourses: CourseInterface[] = TestMock.getCourses(); 
    dispatchCourses({type: "load", courses: newcourses}); 
  

    console.log("syncho courses"); 
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
