import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "./modalStyle";

import TopRetard from "../bsc/TopRetard";
import Course from "../../models/Course";
import MesureBSC from "../../models/bsc/MesureBsc";
import { CourseContext } from "../../provider/AppProvider";

type Props = {
  course: Course;
};

export default function RetardTrain({ course }: Props) {

  // import du service courseService 
  const courseService = useContext(CourseContext)
  
  
  let defaultRetardDepart = 0; 
  let defaultRetartArrive = 0; 
  
  
  // // extrait de la mesure 
  // const retard = (course.mesure as MesureBSC).retards; 
  // if (retard !== undefined) {
  //   if(retard.retardDepart) {
  //     defaultRetardDepart = retard.retardDepart; 
  //   }
  //   if(retard.retardArriver) {
  //     defaultRetartArrive = retard.retardArriver; 
  //   }
  // }
  
  
  const handleSubmit = () => {
    // enregistrement des valeur 
    console.log("début save"); 

    // on vérifie la présence de mesure BSC
    if(!(course.mesure)) {
      courseService?.addMesureBscToCourse(course); 
      console.log("pas de course, ajout de la course"); 
    }

    // enregistrement du retard 
    if (course.mesure) {
      (course.mesure as MesureBSC).retards = {
        retardDepart: retardDepart,
        retardArriver: retardArrive
      }

      courseService?.updateCourse(course); 
      console.log("enregistrement du retard"); 
    }

    

  }
  // state
  const [retardDepart, setRetardDepart] = useState(defaultRetardDepart);
  const [retardArrive, setRetardArrive] = useState(defaultRetartArrive);

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Retard du train</Text>
      <TopRetard
        labelInput="Retard au départ"
        labelButton="Top Départ"
        defaultRetard={0}
        time={course.infoHoraireCourse.datetimeDepartEnq}
        onChangeValue={(value: number) => setRetardDepart(value)}
      />
      <TopRetard
        labelInput="Retard a l'arrivé "
        labelButton="Top Arrivé"
        defaultRetard={0}
        time={course.infoHoraireCourse.datetimeArriveEnq}
        onChangeValue={(value: number) => setRetardArrive(value)}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Valider
      </Button>
    </View>
  );
}
