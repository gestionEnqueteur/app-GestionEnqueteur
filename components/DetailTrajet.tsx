import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import InfoHoraireCourse from "../models/InfoHoraireCourse";

type Props = {
  infoHoraireCourse: InfoHoraireCourse;
};
const removeTiret = (word: string) => {
  return word.replaceAll("-", " ");
};

const formatTime = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const DetailTrajet = (props: Props) => {
  const { infoHoraireCourse } = props;

  const formattedDepartureTime = formatTime(infoHoraireCourse.datetimeDepartEnq);
  const formattedArrivalTime = formatTime(infoHoraireCourse.datetimeArriveEnq);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timeStart}>{formattedDepartureTime}</Text>
        <Text style={styles.timeEnd}>{formattedArrivalTime}</Text>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.gareStart}>{removeTiret(infoHoraireCourse.gareDepartEnq)}</Text>
        <Text style={styles.gareEnd}>{removeTiret(infoHoraireCourse.gareArriveEnq)}</Text>
      </View>
    </View>
  );
};

// création de variable pour parametre le CSS
const SizeNameGare = 18;
const sizeHoraire = 18; 

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  timeStart: {
    marginLeft: 4,
    fontSize: sizeHoraire,
    fontWeight: "bold",
  },
  timeEnd: {
    marginLeft: 4,
    fontSize: sizeHoraire,
  },
  gareStart: {
    fontWeight: "bold",
    fontSize: SizeNameGare,
  },
  gareEnd: {
    marginLeft: 0,
    fontSize: SizeNameGare,
  },
  divider: {
    height: "80%",
    width: 3,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
});

export default DetailTrajet;
