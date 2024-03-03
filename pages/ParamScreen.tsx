import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, Surface, Snackbar } from "react-native-paper";
import { useEffect, useContext, useState } from "react";
import { StorageContext } from "../provider/AppProvider";
import ConfigurationType from "../models/ConfigurationType";
import { useRecoilState } from "recoil";
import { configurationState } from "../store/storeAtom";

type SnackBar = {
  visible: boolean;
  label: string;
  icon: string;
};

export default function ParamScreen() {
  const storageService = useContext(StorageContext);

  const [config, setConfig] = useRecoilState(configurationState);

  const [valueForm, setValueForm] = useState<ConfigurationType>({
    urlApi: "",
    user: "",
  });

  const [snackBar, setSnackBar] = useState<SnackBar>({
    visible: false,
    label: "",
    icon: "",
  });

  const [urlError, setUrlError] = useState(false);

  const [userError, setUserError] = useState(false);

  useEffect(() => {
    // Init de la page

    console.log("Init ParamScreem");
    setValueForm(config);
  }, []);

  const handleOnChangeURL = (newValue: string) => {

    setValueForm({ ...valueForm, urlApi: newValue });

    const urlRegex = /^(https?:\/\/)?[a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/]*)$/;
    // Vérifier si l'URL est valide selon la regex
    const matches = urlRegex.test(newValue);
    // Si une correspondance est trouvée, mettre à jour le valeur de urlApi
    if (matches) {
      setValueForm({ ...valueForm, urlApi: newValue });
      setUrlError(false);
    } else {
      // Sinon, afficher un message d'erreur
      console.log("L'URL n'est pas valide");
      setUrlError(true);
    }
  };

  const handleOnChangeUser = (newValue: string) => {
    
    setValueForm({ ...valueForm, user: newValue });

    const urlRegex = /^(?:[A-Z]{3}|[A-Z][a-z]+(?: [A-Z][a-z]+)*)$/;
    // Vérifier si l'URL est valide selon la regex
    const matches = urlRegex.test(newValue);
    // Si une correspondance est trouvée, mettre à jour le valeur de urlApi
    if (matches) {
      setValueForm({ ...valueForm, user: newValue.toLowerCase()});
      setUserError(false);
    } else {
      // Sinon, afficher un message d'erreur
      console.log("L'URL n'est pas valide");
      setUserError(true);
    }
  };

  const handleOnClickSubmit = () => {
    // stockage dans le AsyncStorage
   
    if (userError || urlError) {
      displaySnackBar('Erreur de saisie dans le formulaire !', "alert-circle");
      return 
    }
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
            value={valueForm.urlApi.toLowerCase()}
            error={urlError}
            autoCapitalize="none"
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
            error={userError}
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
