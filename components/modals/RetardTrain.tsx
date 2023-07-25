import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";

export default function RetardTrain(): JSX.Element {
  // variable de test
  const datetime: Date = new Date();

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Retard du train</Text>
      <TopRetard
        labelInput="Retard au départ"
        labelButton="Top Départ"
        time={datetime}
        onChangeValue={(): void => console.log("salut les lapin")}
      />
      <TopRetard
        labelInput="Retard a l'arrivé "
        labelButton="Top Arrivé"
        time={datetime}
        onChangeValue={(): void => console.log("salut les lapin")}
      />
      <Button
        mode="contained"
        onPress={(): void => console.log("validation retard")}
      >
        Valider
      </Button>
    </View>
  );
}
