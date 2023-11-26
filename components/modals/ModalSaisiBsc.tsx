import React from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import SupressionTrain from "./SupressionTrain";
import RetardTrain from "./RetardTrain";
import InfoTrain from "./InfoTrain";
import GareDeDescente from "./GareDeDescente";
import Course from "../../models/Course";

// import pour les test

type props = {
  visible: boolean;
  select: string;
  setVisible: Function;
  course: Course
};

export default function ModalSaisiBsc(props: props) {
  const { select, visible, course } = props;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => props.setVisible(false)}
      >
        {select === "supression" && <SupressionTrain />}
        {select === "retard" && <RetardTrain course={course}/>}
        {select === "info" && <InfoTrain />}
        {select === "descent" && <GareDeDescente />}
      </Modal>
    </Portal>
  );
}
