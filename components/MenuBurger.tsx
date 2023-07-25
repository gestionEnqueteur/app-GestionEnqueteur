import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";
import { View } from "react-native";
import ModalSaisiBsc from "./modals/ModalSaisiBsc";

export default function MenuBurger(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalSeleted, setModalSeleted] = useState<string>("info");

  const openMenu = (): void => setVisible(true);
  const closeMenu = (): void => setVisible(false);

  //function button
  function openModalSuppressionTrain(): void {
    closeMenu();
    setModalSeleted("supression");
    setModalVisible(true);
  }

  function openModalInfoTrain(): void {
    closeMenu();
    setModalSeleted("info");
    setModalVisible(true);
  }

  function openModalRetardTrain(): void {
    closeMenu();
    setModalSeleted("retard");
    setModalVisible(true);
  }

  function openModalGareDescente(): void {
    closeMenu();
    setModalSeleted("descent");
    setModalVisible(true);
  }

  const button: JSX.Element = (
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
      />
      <Menu visible={visible} anchor={button} onDismiss={closeMenu}>
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
