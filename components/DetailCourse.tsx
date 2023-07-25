import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ChronoTopDepart from "./ChornoTopDepart";
import DetailTrajet from "./DetailTrajet";
import MenuBurger from "./MenuBurger";
import CardNumeroLine from "./CardNumeroLine";
import Quotas from "./Quotas";

import Course from "../models/Course";

type Props = {
  course: Course;
};

const dateOfTest: Date = new Date();

export default function DetailCourse(props: Props): JSX.Element {
  const { course } = props;

  const navigation = useNavigation();

  const [dateTimeHd, setDateTimeHd] = useState<Date>(new Date());
  const [dateTimeHa, setDateTimeHa] = useState<Date>(new Date());

  // pour le test en attende de modification du Mock;
  const dateTimeDeparture: string = "2023-06-09T07:33:14.719Z";
  const datetimeArrival: string = "2023-06-09T07:59:56.333Z";

  useEffect((): void => {
    setDateTimeHd(new Date(dateTimeDeparture));
    setDateTimeHa(new Date(datetimeArrival));
  }, [dateTimeDeparture, datetimeArrival]);

  const handleGotoAction = (): void => {
    switch (course.mission) {
      case "BSC HDF":
        navigation.navigate("SaisiBsc", { course: course });
      default:
        console.log("pas action pour ce type de mission");
    }
  };

  return (
    <TouchableRipple onPress={handleGotoAction}>
      <View style={style.container}>
        <View style={style.lineUp}>
          <View style={style.detailTime}>
            <ChronoTopDepart
              currentDatetime={dateOfTest}
              datetimeArrival={dateOfTest}
              datetimeDepart={dateOfTest}
            />
            <DetailTrajet
              departureTime={dateTimeHd}
              arrivalTime={dateTimeHa}
              departureCity={course.depart}
              arrivalCity={course.arrivee}
            />
          </View>
          <View>
            <MenuBurger />
          </View>
        </View>
        <View style={style.infoLine}>
          {course.ligne && <CardNumeroLine lineNumber={course.ligne} />}
          {course.prQuota && <Quotas value={course.prQuota} />}
          <Text variant="headlineSmall">{course.trainCourse}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

const style = StyleSheet.create({
  container: {
    margin: "1%",
    padding: "1%",
    borderColor: "blue",
    borderStyle: "solid",
    borderWidth: 1,
  },
  lineUp: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  infoLine: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailTime: {
    flexDirection: "row",
    width: 200,
  },
});
