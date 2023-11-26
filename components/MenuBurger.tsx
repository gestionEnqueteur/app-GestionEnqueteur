import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";
import { View } from "react-native";
import ModalSaisiBsc from "./modals/ModalSaisiBsc";
import Course from "../models/Course";

type Props = {
  course: Course;
}

export default function MenuBurger({course}: Readonly<Props>) {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSeleted, setModalSeleted] = useState("info");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //function button
  function openModalSuppressionTrain() {
    closeMenu();
    setModalSeleted("supression");
    setModalVisible(true);
  }

  function openModalInfoTrain() {
    closeMenu();
    setModalSeleted("info");
    setModalVisible(true);
  }

  function openModalRetardTrain() {
    closeMenu();
    setModalSeleted("retard");
    setModalVisible(true);
  }

  function openModalGareDescente() {
    closeMenu();
    setModalSeleted("descent");
    setModalVisible(true);
  }

  const buttom = (
    <IconButton
      mode="contained-tonal"
      icon="dots-vertical"
      onPress={openMenu}
    />
  );

  return (
    <View>
      <ModalSaisiBsc
        visible={modalVisible}
        select={modalSeleted}
        setVisible={setModalVisible}
        course={course}
      />
      <Menu visible={visible} anchor={buttom} onDismiss={closeMenu}>
        <Menu.Item
          leadingIcon="delete"
          onPress={openModalSuppressionTrain}
          title="Train supprimer"
        />
        <Menu.Item
          leadingIcon="train-car-passenger-variant"
          onPress={openModalInfoTrain}
          title="Info train"
        />
        <Menu.Item
          leadingIcon="transit-transfer"
          onPress={openModalGareDescente}
          title="gare de descente"
        />
        <Menu.Item
          leadingIcon="clock"
          onPress={openModalRetardTrain}
          title="Retard"
        />
      </Menu>
    </View>
  );
}
