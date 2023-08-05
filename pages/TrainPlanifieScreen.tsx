import { StyleSheet, ScrollView } from "react-native";
import DetailCourse from "../components/DetailCourse";
import { useEffect } from "react";

import { Text } from "react-native-paper";

export default function TrainPlanifieScreen() {
  useEffect(() => {
    // init du composant.
    console.log("Mount: train");
  }, []);

  return (
    <ScrollView style={style.container}>
      <Text>Test de la pages</Text>
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
