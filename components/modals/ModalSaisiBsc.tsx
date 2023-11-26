import React from "react";
import { Modal, Portal } from "react-native-paper";
import SupressionTrain from "./SupressionTrain";
import RetardTrain from "./RetardTrain";
import InfoTrain from "./InfoTrain";
import GareDeDescente from "./GareDeDescente";

// import pour les test

type props = {
  visible: boolean;
  select: string;
  setVisible: Function;
};

export default function ModalSaisiBsc(props: Readonly<props>) {
  const { select, visible } = props;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => props.setVisible(false)}>
        {select === "supression" && <SupressionTrain />}
        {select === "retard" && <RetardTrain />}
        {select === "info" && <InfoTrain />}
        {select === "descent" && <GareDeDescente />}
      </Modal>
    </Portal>
  );
}
