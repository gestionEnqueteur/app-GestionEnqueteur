import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";
import MesureBSC from "../../models/bsc/MesureBsc";
import InfoHoraireCourse from "../../models/InfoHoraireCourse";
import { useEffect } from "react";
import CompositionTrain from "./CompositionTrain";

type Props = {
  mesure: MesureBSC;
  infoHoraire?: InfoHoraireCourse;
};

export default function InfoTrain(props: Readonly<Props>) {
  const { mesure } = props;

  return (
    <View style={style.splitScreenVertical}>
      <View style={style.infoTrain}>
        <Text variant="labelMedium">Composition : </Text>
        <CompositionTrain composition={mesure.infoTrain.composition} />
        <Text variant="labelMedium">Numéro de matériel :</Text>
        <Text style={style.offsetRight} variant="bodyLarge">
          {mesure.infoTrain.numMaterial ? mesure.infoTrain.numMaterial : "Non renseigné"}
        </Text>
      </View>
      <View style={style.retardTrain}>
        <Text variant="labelMedium">Retard au départ :</Text>
        <Text style={style.offsetRight} variant="bodyLarge">
          { mesure.retards?.retardDepart ? mesure.retards.retardDepart : "?" } min
        </Text>
        <Text variant="labelMedium">Retard à l'arrivé :</Text>
        <Text style={style.offsetRight} variant="bodyLarge">
          { mesure.retards?.retardArriver ? mesure.retards.retardArriver : "?"} min
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },
  header: {
    flexDirection: "column",
  },
  circulation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  infoCourse: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContent: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  infoTrain: {
    flex: 1,
  },
  retardTrain: {
    flex: 1,
  },
  offsetRight: {
    alignSelf: "flex-end",
  },
  splitScreenVertical: {
    flexDirection: "row",
  },
  quotasBsc: {},
  areaButton: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    bottom: 0,
  },
  detailTime: {
    flexDirection: "row",
    width: 200,
  },
});
