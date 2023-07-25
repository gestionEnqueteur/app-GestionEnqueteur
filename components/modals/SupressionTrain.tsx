import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import styles from "./modalStyle";

interface Motif {
  _id: string;
  value: string;
}

export default function SupressionTrain(): JSX.Element {
  // juste pour le test
  const motifSuppression: Motif[] = [
    { _id: "1", value: "Accident de personne" },
    { _id: "2", value: "Panne d'un PN" },
    { _id: "3", value: "Panne Matériel" },
  ];
  const motifSuppressionSelected: Motif[] = [
    { _id: "2", value: "Panne d'un PN" },
  ];

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Motif de suppresion train</Text>
      <PaperSelect
        label="raison d'annulation"
        arrayList={motifSuppression}
        selectedArrayList={motifSuppressionSelected}
        multiEnable={false}
        value="Panne d'un PN"
        onSelection={(): void => console.log("salut")}
      />
      <Button mode="contained">Valider</Button>
    </View>
  );
}
