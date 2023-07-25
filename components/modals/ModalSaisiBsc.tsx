import React from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import SupressionTrain from "./SupressionTrain";
import RetardTrain from "./RetardTrain";
import InfoTrain from "./InfoTrain";
import GareDeDescente from "./GareDeDescente";

// import pour les test

type Props = {
  visible: boolean;
  select: string;
  setVisible: Function;
};

export default function ModalSaisiBsc(props: Props) {
  const { select, visible } = props;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={(): void => props.setVisible(false)}>
        {select === "supression" && <SupressionTrain />}
        {select === "retard" && <RetardTrain />}
        {select === "info" && <InfoTrain />}
        {select === "descent" && <GareDeDescente />}
      </Modal>
    </Portal>
  );
}
