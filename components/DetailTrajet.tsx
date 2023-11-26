import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import InfoHoraireCourse from "../models/InfoHoraireCourse";
import { removeDashes, formatTime } from "../helpers/formatHelper";

type Props = {
  infoHoraireCourse: InfoHoraireCourse;
};

const DetailTrajet = (props: Readonly<Props>) => {
  const { infoHoraireCourse } = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timeStart}>
          {formatTime(infoHoraireCourse.datetimeDepartEnq)}
        </Text>
        <Text style={styles.timeEnd}>
          {formatTime(infoHoraireCourse.datetimeArriveEnq)}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.gareStart}>
          {removeDashes(infoHoraireCourse.gareDepartEnq)}
        </Text>
        <Text style={styles.gareEnd}>
          {removeDashes(infoHoraireCourse.gareArriveEnq)}
        </Text>
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
