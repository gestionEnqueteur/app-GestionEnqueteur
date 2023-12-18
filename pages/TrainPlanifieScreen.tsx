import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import { useContext } from "react";
import { CourseContext, StoreCourseContext } from "../provider/AppProvider";
import Course from "../models/Course";

export default function TrainPlanifieScreen() {
  const courseService = useContext(CourseContext);
  const storeCourse = useContext(StoreCourseContext); 

  const courses = storeCourse.state; 


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
    />
  );
}
