import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text, SegmentedButtons } from "react-native-paper";
import styles from "./modalStyle";

export default function InfoTrain(): JSX.Element {
  const [composition, setComposition] = useState<string>("US");

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Info train</Text>
      <Text variant="titleSmall">Composition : </Text>
      <SegmentedButtons
        value={composition}
        onValueChange={setComposition}
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
      <TextInput style={style.input} mode="outlined" />
      <Button mode="contained">Valider</Button>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    minWidth: 150,
  },
});
