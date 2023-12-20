import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import { useContext } from "react";
import { CourseContext, StoreCourseContext } from "../provider/AppProvider";
import Course from "../models/Course";
import { Text } from "react-native-paper";

export default function TrainPlanifieScreen() {
  const courseService = useContext(CourseContext);
  const storeCourse = useContext(StoreCourseContext); 

  const courses = storeCourse.state; 

  console.log("création de la FlatList"); 


  const renderItem = ({ item }: { item: Course }) => (
    <DetailCourse course={item} />
  );

  const handleOnRefresh = () => {
      console.log("refresh");
      storeCourse.dispatch({type: "load", courses: courseService.loadCourses()})
      
    
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
