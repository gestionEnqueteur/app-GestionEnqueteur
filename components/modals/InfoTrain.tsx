import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text, SegmentedButtons } from "react-native-paper";
import { produce } from "immer";
import styles from "./modalStyle";

import { useDispatchCourses } from "../../hook/useDispatchCourses";
import Course from "../../models/Course";
import CourseBsc from "../../models/bsc/CourseBsc";
import MesureBsc from "../../models/bsc/MesureBsc";

type Props = {
  course: CourseBsc;
  setVisibleModal: (value: boolean) => void;
};

export default function InfoTrain({
  course,
  setVisibleModal,
}: Readonly<Props>) {
  if (!(course.mesure instanceof MesureBsc)) {
    throw new Error("Mesure Invalide pour cette page");
  }

  const [composition, setComposition] = useState<string>(
    course.mesure.infoTrain.composition
  );
  const [numMaterial, setNumMaterial] = useState<string>(
    course.mesure.infoTrain.numMaterial
  );

  const dispatch = useDispatchCourses();

  const onSubmit = () => {
    // test :
    console.log(course);

    // mise a jour du state
    const nextCourse: Course = produce(course, (draft) => {
      if (!(draft.mesure instanceof MesureBsc))
        draft.mesure.infoTrain.composition = composition as
          | "US"
          | "UM2"
          | "UM3";
      draft.mesure.infoTrain.numMaterial = numMaterial;
    });

    console.log(nextCourse);

    dispatch({ type: "update", course: nextCourse.toJson() });

    setVisibleModal(false);
  };

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Info train</Text>
      <Text variant="titleSmall">Composition : </Text>
      <SegmentedButtons
        value={composition}
        onValueChange={(value) => setComposition(value)}
        buttons={[
          {
            value: "US",
            label: "US",
          },
          {
            value: "UM2",
            label: "UM2",
          },
          {
            value: "UM3",
            label: "UM3",
          },
        ]}
      />
      <Text variant="titleSmall">Numéro de matériel : </Text>
      <TextInput
        style={style.input}
        mode="outlined"
        value={numMaterial}
        onChangeText={(value) => setNumMaterial(value)}
      />
      <Button mode="contained" onPress={onSubmit}>
        Valider
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    minWidth: 150,
  },
});
