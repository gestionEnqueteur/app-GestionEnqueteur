import React from "react";
import { Modal, Portal } from "react-native-paper";
import SupressionTrain from "./SupressionTrain";
import RetardTrain from "./RetardTrain";
import InfoTrain from "./InfoTrain";
import GareDeDescente from "./GareDeDescente";
import CourseBsc from "../../models/bsc/CourseBsc";

// import pour les test

type props = {
  visible: boolean;
  select: string;
  setVisible: Function;
  course: CourseBsc; 
};

export default function ModalSaisiBsc(props: Readonly<props>) {
  const { select, visible } = props;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => props.setVisible(false)}>
        {select === "suppression" && <SupressionTrain />}
        {select === "retard" && <RetardTrain course={props.course} />}
        {select === "info" && <InfoTrain  course={props.course} setVisibleModal={props.setVisible} />}
        {select === "descent" && <GareDeDescente />}
      </Modal>
    </Portal>
  );
}
