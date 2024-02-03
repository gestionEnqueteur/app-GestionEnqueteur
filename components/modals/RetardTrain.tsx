import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";
import CourseBsc from "../../models/bsc/CourseBsc";

export default function RetardTrain({
  course,
}: Readonly<{ course: CourseBsc }>) {

  console.log(course);

  // state form 
  const [retardDepartForm, setRetardDepartForm] = useState(0); 
  const [retardArriveForm, setRetardArriveForm] = useState(0); 
  

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Retard du train</Text>
      <TopRetard
        labelInput="Retard au départ"
        labelButton="Top Départ"
        time={new Date(course.infoHoraireCourse.datetimeDepartEnq)}
        onChangeValue={() => console.log("function onChangeValue depart")}
      />
      <TopRetard
        labelInput="Retard a l'arrivé "
        labelButton="Top Arrivé"
        time={new Date(course.infoHoraireCourse.datetimeArriveEnq)}
        onChangeValue={() => console.log("function onChangeValue arrive")}
      />
      <Button mode="contained" onPress={() => console.log("validation retard")}>
        Valider
      </Button>
    </View>
  );
}
