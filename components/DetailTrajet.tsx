import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";

type DetailTrajetProps = {
  departureTime: Date;
  arrivalTime: Date;
  departureCity: string;
  arrivalCity: string;
};
const removeTiret = (word: string): string => {
  return word.replaceAll("-", " ");
};

const formatTime = (time: Date): string => {
  const hours: string = time.getHours().toString().padStart(2, "0");
  const minutes: string = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const DetailTrajet = (props: DetailTrajetProps): JSX.Element => {
  const { departureTime, arrivalTime, departureCity, arrivalCity } = props;

  const formattedDepartureTime: string = formatTime(departureTime);
  const formattedArrivalTime: string = formatTime(arrivalTime);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timeStart}>{formattedDepartureTime}</Text>
        <Text style={styles.timeEnd}>{formattedArrivalTime}</Text>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.cityStart}>{removeTiret(departureCity)}</Text>
        <Text style={styles.cityEnd}>{removeTiret(arrivalCity)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  timeStart: {
    marginLeft: 4,
    fontSize: 24,
    fontWeight: "bold",
  },
  timeEnd: {
    marginLeft: 4,
    fontSize: 24,
  },
  cityStart: {
    fontWeight: "bold",
    fontSize: 24,
  },
  cityEnd: {
    marginLeft: 0,
    fontSize: 24,
  },
  divider: {
    height: "80%",
    width: 3,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
});

export default DetailTrajet;
