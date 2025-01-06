import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";
import { produce } from "immer";
import MesureBsc from "../../models/bsc/MesureBsc";
import Course from "../../models/Course";
import { useStoreZustand } from "../../store/storeZustand";

type Props = {
  course: Course;
  setVisibleModal: (value: boolean) => void;
};

export default function RetardTrain({
  course,
  setVisibleModal,
}: Readonly<Props>) {
  const dispatch = useStoreZustand(state => state.dispatchCourse)

  // verif mesure BSC 
  if(!(course.mesure instanceof MesureBsc)) {
    throw new Error("Mesure n'est pas une mesure BSC"); 
  }

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

    const newCourse = produce(course, (draft) => {
      if(!(draft.mesure instanceof MesureBsc)) {
        throw new Error("mesure n'est pas une mesure BSC"); 
      }

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
