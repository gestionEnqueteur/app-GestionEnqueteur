import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";
import InfoTrain from "../../models/bsc/InfoTrain";

type Props = {
  infoTrain: InfoTrain
}

export default function InfoTrainSaisiBsc({infoTrain}: Readonly<Props>) {


  return (
    <View style={style.infoTrain}>
      <Text variant="labelMedium">Composition : </Text>
      <Avatar.Text label="US" size={40} />
      <Text variant="labelMedium">Numéro de matériel :</Text>
      <Text style={style.offsetRight} variant="bodyLarge">
        {infoTrain.numMaterial}
      </Text>
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
