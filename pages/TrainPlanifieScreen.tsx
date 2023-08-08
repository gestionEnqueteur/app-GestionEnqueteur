import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../provider/AppProvider";
import Course from "../models/Course";

export default function TrainPlanifieScreen() {
  const courseService = useContext(CourseContext);

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // init du composant.
    console.log("Mount: train");
    if (courseService) {
      const loadedCourses = courseService.getCourses();
      console.log(loadedCourses);
      setCourses(loadedCourses);
    }
  }, []);

  const renderItem = ({ item }: { item: Course }) => (
    <DetailCourse course={item} />
  );

  const handleOnRefresh = () => {
    if (courseService) {
      setCourses(courseService.loadCourses());
      console.log("refresh");
    }
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
