import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";
import Course from "../../models/Course";

type Props = {
  course: Course;
};

export default function RetardTrain({ course }: Props) {
  
  const handleSubmit = () => {
    // enregistrement des valeur 
  }

  // state
  const [retardDepart, setRetardDepart] = useState(0);
  const [retardArrive, setRetardArrive] = useState(0);

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Retard du train</Text>
      <TopRetard
        labelInput="Retard au départ"
        labelButton="Top Départ"
        defaultRetard={0}
        time={course.infoHoraireCourse.datetimeDepartEnq}
        onChangeValue={(value: number) => setRetardDepart(value)}
      />
      <TopRetard
        labelInput="Retard a l'arrivé "
        labelButton="Top Arrivé"
        defaultRetard={0}
        time={course.infoHoraireCourse.datetimeArriveEnq}
        onChangeValue={(value: number) => setRetardArrive(value)}
      />
      <Button mode="contained" onPress={() => console.log("validation retard")}>
        Valider
      </Button>
    </View>
  );
}
