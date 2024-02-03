import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";
import { View } from "react-native";
import ModalSaisiBsc from "./modals/ModalSaisiBsc";
import CourseBsc from "../models/bsc/CourseBsc";

export default function MenuBurger({
  course,
}: Readonly<{ course: CourseBsc }>) {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSeleted, setModalSeleted] = useState("info");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //function button

  const openModal = (modal: string) => {
    closeMenu();
    setModalSeleted(modal);
    setModalVisible(true);
  };

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
          onPress={() => openModal("suppression")}
          title="Train supprimer"
        />
        <Menu.Item
          leadingIcon="train-car-passenger-variant"
          onPress={() => openModal("info")}
          title="Info train"
        />
        <Menu.Item
          leadingIcon="transit-transfer"
          onPress={() => openModal("descent")}
          title="gare de descente"
        />
        <Menu.Item
          leadingIcon="clock"
          onPress={() => openModal("retard")}
          title="Retard"
        />
      </Menu>
    </View>
  );
}
