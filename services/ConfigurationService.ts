import AsyncStorage from "@react-native-async-storage/async-storage";

export const getConfiguration = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("configuration");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

//TODO: rajouter la fonction setConfiguration
