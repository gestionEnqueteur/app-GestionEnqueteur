import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, Surface, Snackbar } from "react-native-paper";
import { useEffect, useContext, useState } from "react";
import { StorageContext } from "../provider/AppProvider";
import ConfigurationType from "../models/ConfigurationType";
import { useRecoilState } from "recoil";
import { configurationState } from "../store/storeAtom";
import useSnackBar from "../hook/useSnackBar";

export default function ParamScreen() {
  const storageService = useContext(StorageContext);

  const [config, setConfig] = useRecoilState(configurationState);

  const [valueForm, setValueForm] = useState<ConfigurationType>({
    urlApi: "",
    user: "",
  });

  const displaySnackBarCommun = useSnackBar();

  useEffect(() => {
    // Init de la page

    console.log("Init ParamScreem");
    setValueForm(config);
  }, []);

  const handleOnChangeURL = (newValue: string) => {
    setValueForm({ ...valueForm, urlApi: newValue });
    //TODO: rajouter vérification sur URL
  };

  const handleOnChangeUser = (newValue: string) => {
    setValueForm({ ...valueForm, user: newValue });
    //TODO: rajouter vérification sur user
  };

  const handleOnClickSubmit = () => {
    // stockage dans le AsyncStorage
    //TODO: appliquer une vérification de la cohérence, via des regex par exemple
    storageService.saveData(
      valueForm,
      "configuration",
      succesSave,
      failureSave
    );
    setConfig(valueForm);
  };

  const succesSave = () => {
    console.info("succes de la sauvegarde");

    displaySnackBar("Paramètre sauvegardé", "content-save");
  };

  const failureSave = (e: Error) => {
    displaySnackBar("Erreur d'enregistrement", "alert-circle");
  };

  const displaySnackBar = (label: string, icon: string) => {
    displaySnackBarCommun({
      children: label,
      icon: icon,
      duration: 2000,
      onIconPress: () => {},
      action: {
        label: "fermer",
        onPress: () => {},
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Surface style={style.areaParam}>
        <View>
          <Text>URL API : </Text>
          <TextInput
            mode="outlined"
            label="Endpoint API"
            placeholder="URL API"
            onChangeText={handleOnChangeURL}
            value={valueForm.urlApi}
          />
        </View>
        <View>
          <Text>Enquetteur</Text>
          <TextInput
            mode="outlined"
            label="enqueteur"
            placeholder="trigramme enqueteur
           ou nom enqueteur"
            onChangeText={handleOnChangeUser}
            value={valueForm.user}
          />
        </View>
        <View style={style.buttonArea}>
          <View>
            <Button
              mode="contained-tonal"
              onPress={() => console.log("click sur le bouton Tester API")}
            >
              Tester API
            </Button>
          </View>
          <View>
            <Button mode="contained-tonal" onPress={handleOnClickSubmit}>
              Enregistrer
            </Button>
          </View>
        </View>
      </Surface>
      <Button mode="contained">Syncronisation enquête</Button>
      <Button mode="contained">Recherche mise à jour application</Button>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 7,
    justifyContent: "space-evenly",
    gap: 6,
  },
  areaParam: {
    gap: 5,
    padding: 4,
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
