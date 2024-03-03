import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Surface, Text, TextInput } from "react-native-paper";

import CardNumeroLine from "../../components/CardNumeroLine";
import ChronoTopDepart from "../../components/ChronoTopDepart";
import DetailTrajet from "../../components/DetailTrajet";
import MenuBurger from "../../components/MenuBurger";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/StackNavigation";
import { useCourseById } from "../../hook/useCourseById";
import CourseBsc from "../../models/bsc/CourseBsc";

type Props = NativeStackScreenProps<RootStackParamList, "SaisiBsc">;

export default function SaisiBscScreen({ route }: Readonly<Props>) {
  const course = useCourseById(route.params.courseId) as CourseBsc;
  

  // raccourci
  const { retards, infoTrain } = course.mesure;

  console.log("re-render pas saisiBSC");
  
  const handleInputChange = (text:string) => {
    // Vérifier si la valeur est un nombre
    if (!isNaN(Number(text)) {
      // C'est un nombre, mettre à jour l'état
      return text
    }
    // Si vous souhaitez ignorer les caractères non numériques, ne rien faire ici
  };
  const handleSubmit = () => {
    // Utiliser la valeur numérique pour d'autres actions
    
  };

  return (
    <View style={style.container}>
      <Surface style={style.header} mode="elevated" elevation={4}>
        <View style={style.circulation}>
          <CardNumeroLine lineNumber={course.ligne} />

          <Text variant="displaySmall">{course.trainCourse}</Text>
        </View>
        <View style={style.infoCourse}>
          <View style={style.detailTime}>
            <ChronoTopDepart
              depart={course.infoHoraireCourse.datetimeArriveEnq}
              arrival={course.infoHoraireCourse.datetimeDepartEnq}
            />
            <DetailTrajet infoHoraireCourse={course.infoHoraireCourse} />
          </View>
          <MenuBurger course={course} />
        </View>
      </Surface>
      <ScrollView style={style.mainContent}>
        <View style={style.splitScreenVertical}>
          <View style={style.infoTrain}>
            <Text variant="labelMedium">Composition : </Text>
            <Avatar.Text label={infoTrain.composition} size={48}  />
            <Text variant="labelMedium">Numéro de matériel :</Text>
            <Text style={style.offsetRight} variant="bodyLarge">
              {infoTrain.numMaterial ? infoTrain.numMaterial : "non renseigné"}
            </Text>
          </View>
          <View style={style.retardTrain}>
            <Text variant="labelMedium">Retard au départ :</Text>
            <Text style={style.offsetRight} variant="bodyLarge">
              {retards?.retardDepart
                ? `${retards.retardDepart} min`
                : "non renseigné"}
            </Text>
            <Text variant="labelMedium">Retard à l'arrivé :</Text>
            <Text style={style.offsetRight} variant="bodyLarge">
              {retards?.retardArrive
                ? `${retards.retardArrive} min`
                : "non renseigné"}
            </Text>
          </View>
        </View>
        <View style={style.quotasBsc}>
          <TextInput mode="outlined" label="Questionnaire distribué : "
          keyboardType="number-pad"         
          />
          <TextInput mode="outlined" label="Questionnaire récupéré vide :"
          keyboardType="number-pad" 
          />
          <TextInput mode="outlined" label="Questionnaire Inexploitable : " 
          keyboardType="number-pad"
          />
        </View>
        <View style={style.areaButton}>
          <Button
            mode="contained"
            onPress={handleSubmit/*() => console.log("Enregistrement du formulaire Saisi")*/}
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
    width: 200,
  },
});
