import { StyleSheet, ScrollView } from "react-native";
import DetailCourse from "../components/DetailCourse";
import { useEffect, useState } from "react";

import Course from "../models/Course";
import TestMock from "../services/TestMock";


export default function TrainPlanifieScreen() {
  const [listCourse, setListCourse] = useState<Course[]>([]);

  useEffect(() => {
    // init du composant.
    setListCourse(TestMock.getCourses());
  }, []);

  return (
    <ScrollView style={style.container}>
      {listCourse.map((course) => (
        <DetailCourse course={course} key={course.id} />
      ))}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
});
