import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text, SegmentedButtons } from "react-native-paper";
import styles from "./modalStyle";
import CourseBsc from "../../models/bsc/CourseBsc";
import { CompositionEnum } from "../../models/enum";
import { useDipatchCourses } from "../../hook/useDispatchCourses";

export default function InfoTrain({ course }: Readonly<{ course: CourseBsc }>) {
  const [composition, setComposition] = useState("US");
  const [numMaterial, setNumMaterial] = useState<string>(
    course.mesure.infoTrain.numMaterial
  );

  const dispach = useDipatchCourses();

  const onSubmit = () => {
    // test :
    console.log(composition);
    console.log(numMaterial);

    // mise a jour du state
    let copyCourse: CourseBsc = course;
    //copyCourse.infoHoraireCourse.gareDepartEnq = "Marseille"; 
    Object.assign(copyCourse,{numMaterial: "test"});

     

    console.log(JSON.stringify(course.infoHoraireCourse));
    console.log("ensuite la copie");
    console.log(JSON.stringify(copyCourse.infoHoraireCourse));

    // dispach la mise a jour
    dispach({ type: "update", course: copyCourse });
  };

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Info train</Text>
      <Text variant="titleSmall">Composition : </Text>
      <SegmentedButtons
        value={composition}
        onValueChange={setComposition}
        buttons={[
          {
            value: CompositionEnum.US,
            label: "US",
          },
          {
            value: CompositionEnum.UM2,
            label: "UM2",
          },
          {
            value: CompositionEnum.UM3,
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
