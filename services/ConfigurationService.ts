import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigurationType from "../models/ConfigurationType";

export const loadConfiguration = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("configuration");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const saveConfiguration = async (
  data: ConfigurationType,
  succes?: Function,
  failure?: Function
) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("configuration", jsonValue);
    if (succes) succes();
  } catch (e) {
    console.log("erreur d'enregistrement de la config: " + e);
    if (failure) failure(e);
  }
};
