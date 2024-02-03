import AsyncStorage from "@react-native-async-storage/async-storage";
import TestMock from "./TestMock";

export default class StorageService {

  async saveData(
    newValue: any,
    key: string, 
    succesCallback?: Function,
    failureCallback?: Function
  ) {
    console.log("save data");
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
      if (succesCallback) succesCallback();
    } catch (e) {
      console.error(e);
      if (failureCallback) failureCallback(e);
    }
  }

  async loadData(key: string) {
    console.log("load data");

    try {
      
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      //console.log(`value data : ${value}`)
      if (value) {
        return value; 
      }
    } catch (e) {
      console.error(e);
      return null 
    }
  }

  /**
   *
   * @returns the list des courses from mock
   * @deprecated ne pas utiliser, sera supprimer très prochainement !!!!
   */
  getAllCourse() {
    //TODO: supprimer la fonction

    return TestMock.getCourses();
  }
}
