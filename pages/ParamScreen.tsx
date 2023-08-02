import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, Surface, Snackbar } from "react-native-paper";
import { useEffect, useContext, useState } from "react";
import { ConfigurationContext } from "../provider/ConfigurationProvider";
import { saveConfiguration } from "../services/ConfigurationService";

type SnackBar = {
  visible: boolean;
  label: string;
  icon: string;
};

type ValueForm = {
  urlApi: string;
  user: string;
};

export default function ParamScreen() {
  const { configuration } = useContext(ConfigurationContext);

  const [valueForm, setValueForm] = useState<ValueForm>({
    urlApi: "",
    user: "",
  });

  const [snackBar, setSnackBar] = useState<SnackBar>({
    visible: false,
    label: "",
    icon: "",
  });

  useEffect(() => {
    // Init de la page

    // récupération de la configuration au niveau du Provider
    console.log("Init ParamScreem");
    setValueForm(configuration);
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
    saveConfiguration(valueForm, succesSave, failureSave);
  };

  const succesSave = () => {
    displaySnackBar("Paramètre sauvegardé", "content-save");
  };

  const failureSave = (e: Error) => {
    displaySnackBar("Erreur d'enregistrement", "alert-circle");
  };

  const displaySnackBar = (label: string, icon: string) => {
    // mettre a jour le state
    setSnackBar({ label: label, icon: icon, visible: true });
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
      <Snackbar
        visible={snackBar.visible}
        onDismiss={() => setSnackBar({ ...snackBar, visible: false })}
        icon={snackBar.icon}
        onIconPress={() => setSnackBar({ ...snackBar, visible: false })}
        duration={2000}
        action={{
          label: "fermer",
          onPress: () => {
            setSnackBar({ ...snackBar, visible: false });
          },
        }}
      >
        {snackBar.label}
      </Snackbar>
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
