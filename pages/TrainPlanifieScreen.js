import { StyleSheet, ScrollView, FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";

import planning from "../mock/planning.json";

export default function TrainPlanifieScreen() {
  return (
    <ScrollView style={style.container}>
      {planning.map((course) => (
        <DetailCourse course={course} key={course._id.$oid} />
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
