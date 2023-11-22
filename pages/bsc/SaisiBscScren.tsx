import { View, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";

import CardNumeroLine from "../../components/CardNumeroLine";
import ChronoTopDepart from "../../components/ChronoTopDepart";
import DetailTrajet from "../../components/DetailTrajet";
import MenuBurger from "../../components/MenuBurger";
import InfoHoraireCourse from "../../models/InfoHoraireCourse";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/StackNavigation";
import Course from "../../models/Course";
import { CourseContext } from "../../provider/AppProvider";
import InfoTrain from "../../components/bsc/InfoTrain";
import MesureBSC from "../../models/bsc/MesureBsc";
import { CompositionEnum } from "../../models/enum";
import Questionnaires from "../../models/bsc/Questionnaire";
import InfoTrainType from "../../models/bsc/InfoTrain";

type Props = NativeStackScreenProps<RootStackParamList, "SaisiBsc">;
type CourseProps = {
  course: Course;
};

export default function SaisiBscScreen({ route }: Readonly<Props>) {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const serviceSource = useContext(CourseContext);

  useEffect(() => {
    // init de la page
    const theCourse = serviceSource
      ?.getCourses()
      .find((item) => item.id === route.params.idCourse);
    console.log(theCourse); // a supprimer juste pour le test
    if (theCourse == undefined) {
      throw new Error(
        `Erreur: pas de course avec cette ID : ${route.params.idCourse}`
      );
    }

    setCourse(theCourse);

    return () => {
      console.log("destruction page Saisi");
    };
  }, []);

  if (course) {
    return <ThePage course={course} />;
  }
  return <ActivityIndicator size="large" />;
}

function ThePage(props: Readonly<CourseProps>) {
  const { course } = props;
  const courseService = useContext(CourseContext);

  const [mesure, setMesure] = useState<MesureBSC | undefined>(undefined); 
  const [form, setForm] = useState({
    vides: "",
    inexploitables: "",
    distribuees: "",
  });
  
  useEffect(() => {
    // si mesure n'existe pas, on lui met la mesure
    if (!course.mesure) {
      console.log("mesure n'existe pas");
      courseService?.addMesureBscToCourse(course);
    }
    // Init du composant SaisiBscScreen
    if (
      course.mesure &&
      "questionnaires" in course.mesure &&
      course.mesure.questionnaires
    ) {
      const questionnaire: Questionnaires = course.mesure.questionnaires;

      // on met les valeur dans le formulaire
      setForm({
        vides: questionnaire.vides.toString(),
        inexploitables: questionnaire.inexploitables.toString(),
        distribuees: questionnaire.distribuees.toString(),
      });
    }

    // vérification de la mesure 
    if (course.mesure && "infoTrain" in course.mesure) {
      setMesure(course.mesure); 
    }

   
  }, []);

  const handleChangeFieldEmpty = (newValue: string) => {
    setForm({ ...form, vides: newValue });
  };

  const handleChangeFieldDistri = (newValue: string) => {
    setForm({ ...form, distribuees: newValue });
  };

  const handleChangeFieldInexploitables = (newValue: string) => {
    setForm({ ...form, inexploitables: newValue });
  };

  const handleOnSubmitForm = () => {
    // sousmission du formulaire
    console.log("Sousmission du formulaire");
  };

  const handleOnSaveForm = () => {
    // enregistrement
    console.log("Enregistrement du formulaire");
    console.log(form);

    try {
      // on essaye la sauvegarde
      const questionnaire: Questionnaires = {
        vides: Number(form.vides),
        inexploitables: Number(form.inexploitables),
        distribuees: Number(form.distribuees),
      };

      if (course.mesure && "questionnaires" in course.mesure) {
        console.log("la mesure est bien présent");
        course.mesure.questionnaires = questionnaire;
        console.log(course);

        // on vérifie si c'est bien un nombre entier
        if (
          !Number.isInteger(course.mesure.questionnaires.distribuees) ||
          !Number.isInteger(course.mesure.questionnaires.vides) ||
          !Number.isInteger(course.mesure.questionnaires.inexploitables)
        ) {
          // ce n'est pas un nombre, on lève une Error
          throw new Error(
            "Formulaire invalide, les champ doivent etre des nombre entier"
          );
        }
        // on sauvegarde dans le storage.
        courseService?.updateCourse(course);
      }

      // vérification que c'est bien des nombre
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={style.container}>
      <Surface style={style.header} mode="elevated" elevation={4}>
        <View style={style.circulation}>
          {course.ligne && <CardNumeroLine lineNumber={course.ligne} />}

          <Text variant="displaySmall">{course.trainCourse}</Text>
        </View>
        <View style={style.infoCourse}>
          <View style={style.detailTime}>
            <ChronoTopDepart
              arrival={course.infoHoraireCourse.datetimeArriveEnq}
              depart={course.infoHoraireCourse.datetimeDepartEnq}
            />
            {course.infoHoraireCourse && (
              <DetailTrajet infoHoraireCourse={course.infoHoraireCourse} />
            )}
          </View>
          <MenuBurger />
        </View>
      </Surface>
      <ScrollView style={style.mainContent}>
        {mesure ? (
          <InfoTrain
            mesure={mesure}
            infoHoraire={course.infoHoraireCourse}
          />
        ): <Text>pas de mesure</Text>}
        <View style={style.quotasBsc}>
          <TextInput
            mode="outlined"
            label="Questionnaire distribué : "
            inputMode="numeric"
            onChangeText={handleChangeFieldDistri}
            value={form.distribuees}
          />
          <TextInput
            mode="outlined"
            label="Questionnaire récupéré vide :"
            inputMode="numeric"
            onChangeText={handleChangeFieldEmpty}
            value={form.vides}
          />
          <TextInput
            mode="outlined"
            label="Questionnaire Inexploitable : "
            inputMode="numeric"
            onChangeText={handleChangeFieldInexploitables}
            value={form.inexploitables}
          />
        </View>
        <View style={style.areaButton}>
          <Button mode="contained" onPress={handleOnSaveForm}>
            Enregister
          </Button>
          <Button mode="contained" onPress={handleOnSubmitForm}>
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
