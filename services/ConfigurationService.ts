import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigurationType from "../models/ConfigurationType";

export default class ConfigurationService implements ConfigurationType {
  urlApi: string;
  user: string;

  constructor(configuration: ConfigurationType) {
    this.urlApi = configuration.urlApi;
    this.user = configuration.user;
  }

  async loadConfiguration() {
    console.log("chargement de la config dans AsyncStorage");

    try {
      const jsonValue = await AsyncStorage.getItem("configuration");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (value) {
        this.urlApi = value.urlApi;
        this.user = value.user;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async saveConfiguration(
    newConfiguration: ConfigurationType,
    succesCallback?: Function,
    failureCallback?: Function
  ) {
    console.log("save la configuration");
    try {
      const jsonValue = JSON.stringify(newConfiguration);
      await AsyncStorage.setItem("configuration", jsonValue);
      this.urlApi = newConfiguration.urlApi;
      this.user = newConfiguration.user;
      if (succesCallback) succesCallback();
    } catch (e) {
      console.error(e);
      if (failureCallback) failureCallback(e);
    }
  }

  getConfiguration() {
    return {urlApi: this.urlApi, user: this.user};
  }

  setConfiguration(newConfiguration: ConfigurationType) {
    //TODO: mettre en place la sécurité ici

    this.saveConfiguration(newConfiguration);
    return this;
  }
}
