import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import ChronoTopDepart from "./ChronoTopDepart";
import DetailTrajet from "./DetailTrajet";
import MenuBurger from "./MenuBurger";
import CardNumeroLine from "./CardNumeroLine";
import Quotas from "./Quotas";
import TypeCourse from "./TypeCourse";

import Course from "../models/Course";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../pages/navigations/StackNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CourseBsc from "../models/bsc/CourseBsc";

type Props = {
  course: Course;
};

export default function DetailCourse(props: Readonly<Props>) {
  const { course } = props;

  // utilisation du hook use navigation 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

  //console.log(`création composant : ${course.id}`)

  const handleGoToAction = () => {
    // appuie sur le composant
    switch (course.mission) {
      case "BSC HDF":
        console.log("Basculement vers la page de saisie");
        navigation.navigate("SaisiBsc", {courseId: course.id} ); 
        
        break;
      case "HLP VS":
        console.log("afficher le link waze ou cordonner GPS");
        break;
      default:
        console.log("pas action pour ce type de mission");
    }
  };

  return (
    <TouchableRipple onPress={handleGoToAction}>
      <View style={style.container}>
        <View style={style.lineUp}>
          <View style={style.detailTime}>
            {course.infoHoraireCourse && (
              <ChronoTopDepart
                depart={course.infoHoraireCourse.datetimeArriveEnq}
                arrival={course.infoHoraireCourse.datetimeDepartEnq}
              />
            )}
            {course.infoHoraireCourse && (
              <DetailTrajet infoHoraireCourse={course.infoHoraireCourse} />
            )}
          </View>
          <View>{course.mission === "BSC HDF" && <MenuBurger course={course as CourseBsc}/>}</View>
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
