import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";
import { useDispatchCourses } from "../../hook/useDispatchCourses";
import { produce } from "immer";
import CourseBsc from "../../models/bsc/CourseBsc";

type Props = {
  course: CourseBsc;
  setVisibleModal: (value: boolean) => void;
};

export default function RetardTrain({
  course,
  setVisibleModal,
}: Readonly<Props>) {
  const dispatch = useDispatchCourses();

  // state form
  const [retardDepart, setRetardDepart] = useState(
    course.mesure.retards.retardDepart ?? 0
  );
  const [retardArrive, setRetardArrive] = useState(
    course.mesure.retards.retardArrive ?? 0
  );

  const handleOnValidate = () => {
    console.log("validation");

    if (Number.isNaN(retardDepart) || Number.isNaN(retardArrive)) {
      // formulaire incorrect
      console.log("formulaire incorect");
      //TODO: mettre en place un snackBack pour notifier user
      return;
    }

    const newCourse: CourseBsc = produce(course, (draft) => {
      // modification de la course
      draft.mesure.retards.retardDepart = retardDepart;
      draft.mesure.retards.retardArrive = retardArrive;

      return draft;
    });

    // update course
    dispatch({ type: "update", course: newCourse });

    setVisibleModal(false);
  };

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Retard du train</Text>
      <TopRetard
        labelInput="Retard au départ"
        labelButton="Top Départ"
        time={new Date(course.infoHoraireCourse.datetimeDepartEnq)}
        onChangeValue={setRetardDepart}
        defaultValue={course.mesure.retards.retardDepart ?? 0}
      />
      <TopRetard
        labelInput="Retard a l'arrivé "
        labelButton="Top Arrivé"
        time={new Date(course.infoHoraireCourse.datetimeArriveEnq)}
        onChangeValue={setRetardArrive}
        defaultValue={course.mesure.retards.retardArrive ?? 0}
      />
      <Button mode="contained" onPress={handleOnValidate}>
        Valider
      </Button>
    </View>
  );
}
