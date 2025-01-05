import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import Course from "../models/Course";
import { Text } from "react-native-paper";
import CourseInterface from "../models/CourseInterface";
import TestMock from "../services/TestMock";
import { useStoreZustand } from "../store/storeZustand";

export default function TrainPlanifieScreen() {
  const courses = useStoreZustand((state) => state.courses);

  const renderItem = ({ item }: { item: Course }) => (
    <DetailCourse course={item} />
  );

  const handleOnRefresh = async () => {
    console.log("refresh");

    const newcourses: CourseInterface[] = TestMock.getCourses();
    //dispatch({ type: "load", courses: newcourses });
  };

  return (
    <FlatList
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={handleOnRefresh}
      refreshing={false}
      ListEmptyComponent={<Text>La liste est vide </Text>}
    />
  );
}
