import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";

export default function RetardTrain() {
  // variable de test
  const datetime = new Date();

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Retard du train</Text>
      <TopRetard
        labelInput="Retard au départ"
        labelButton="Top Départ"
        time={datetime}
        onChangeValue={() => console.log("function onChangeValue depart")}
      />
      <TopRetard
        labelInput="Retard a l'arrivé "
        labelButton="Top Arrivé"
        time={datetime}
        onChangeValue={() => console.log("function onChangeValue arrive")}
      />
      <Button mode="contained" onPress={() => console.log("validation retard")}>Valider</Button>
    </View>
  );
}
