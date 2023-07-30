import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import ChronoTopDepart from "./ChornoTopDepart";
import DetailTrajet from "./DetailTrajet";
import MenuBurger from "./MenuBurger";
import CardNumeroLine from "./CardNumeroLine";
import Quotas from "./Quotas";
import TypeCourse from "./TypeCourse";

import Course from "../models/Course";

type Props = {
  course: Course;
};

export default function DetailCourse(props: Props) {
  const { course } = props;

  const handleGotoAction = () => {
    // appuie sur le composant
    switch (course.mission) {
      case "BSC HDF":
        console.log("Basculement vers la page saisi");
        break;
      case "HLP VS":
        console.log("afficher le link waze ou cordonner GPS");
        break;
      default:
        console.log("pas action pour ce type de mission");
    }
  };

  const isMissionBSC = (): boolean => {
    return course.mission === "BSC HDF";
  };

  return (
    <TouchableRipple onPress={handleGotoAction}>
      <View style={style.container}>
        <View style={style.lineUp}>
          <View style={style.detailTime}>
            {course.infoHoraireCourse && (
              <ChronoTopDepart
                currentDatetime={new Date()} //TODO: a refactoriser.
                datetimeArrival={course.infoHoraireCourse.datetimeArriveEnq}
                datetimeDepart={course.infoHoraireCourse.datetimeDepartEnq}
              />
            )}
            {course.infoHoraireCourse && (
              <DetailTrajet infoHoraireCourse={course.infoHoraireCourse} />
            )}
          </View>
          <View>{isMissionBSC() && <MenuBurger />}</View>
        </View>
        <View style={style.infoLine}>
          <TypeCourse mission={course.mission} />
          {course.ligne && <CardNumeroLine lineNumber={course.ligne} />}
          {course.objectif && <Quotas value={course.objectif} />}
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
