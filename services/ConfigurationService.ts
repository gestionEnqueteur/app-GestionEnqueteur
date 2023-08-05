import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigurationType from "../models/ConfigurationType";

export default class ConfigurationService {
  private configuration: ConfigurationType;

  constructor(configuration: ConfigurationType) {
    this.configuration = configuration;
  }

  async loadConfiguration() {
    try {
      const jsonValue = await AsyncStorage.getItem("configuration");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (value) this.configuration = value;
    } catch (e) {
      console.log(e);
    }
  }

  async saveConfiguration(newConfiguration: ConfigurationType) {
    try {
      const jsonValue = JSON.stringify(newConfiguration);
      await AsyncStorage.setItem("configuration", jsonValue);
    } catch (e) {
      console.error(e);
    }
  }

  getConfiguration() {
    return this.configuration;
  }

  setConfiguration(newConfiguration: ConfigurationType) {
    //TODO: mettre en place la sécurité ici

    this.saveConfiguration(newConfiguration);
  }
}
