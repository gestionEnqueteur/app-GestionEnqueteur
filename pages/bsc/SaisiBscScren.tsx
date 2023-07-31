import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

import CardNumeroLine from "../../components/CardNumeroLine";
import ChronoTopDepart from "../../components/ChronoTopDepart";
import DetailTrajet from "../../components/DetailTrajet";
import MenuBurger from "../../components/MenuBurger";

// variable de test
const datetime = new Date();

// test composant

export default function SaisiBscScreen() {
  const [value, setValue] = useState("");

  return (
    <View style={style.container}>
      <Surface style={style.header} mode="elevated" elevation={4}>
        <View style={style.circulation}>
          <CardNumeroLine lineNumber="K12" />

          <Text variant="displaySmall">814206</Text>
        </View>
        <View style={style.infoCourse}>
          <View style={style.detailTime}>
            <ChronoTopDepart
              currentDatetime={datetime}
              datetimeArrival={datetime}
              datetimeDepart={datetime}
            />
            <DetailTrajet
              departureTime={datetime}
              arrivalTime={datetime}
              departureCity="Lille"
              arrivalCity="Paris"
            />
          </View>
          <MenuBurger />
        </View>
      </Surface>
      <ScrollView style={style.mainContent}>
        <View style={style.splitScreenVertical}>
          <View style={style.infoTrain}>
            <Text variant="labelMedium">Composition : </Text>
            <Avatar.Text label="US" size={40} />
            <Text variant="labelMedium">Numéro de matériel :</Text>
            <Text style={style.offsetRight} variant="bodyLarge">
              21 82 889
            </Text>
          </View>
          <View style={style.retardTrain}>
            <Text variant="labelMedium">Retard au départ :</Text>
            <Text style={style.offsetRight} variant="bodyLarge">
              10 min
            </Text>
            <Text variant="labelMedium">Retard à l'arrivé :</Text>
            <Text style={style.offsetRight} variant="bodyLarge">
              15 min
            </Text>
          </View>
        </View>
        <View style={style.quotasBsc}>
          <TextInput mode="outlined" label="Questionnaire distribué : " />
          <TextInput mode="outlined" label="Questionnaire récupéré vide :" />
          <TextInput mode="outlined" label="Questionnaire Inexploitable : " />
        </View>
        <View style={style.areaButton}>
          <Button
            mode="contained"
            onPress={() => console.log("Enregistrement du formulaire Saisi")}
          >
            Enregister
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Sousmission du formulaire Saisi")}
          >
            Soumettre
          </Button>
        </View>
      </ScrollView>
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
    width: 200
  }
});
