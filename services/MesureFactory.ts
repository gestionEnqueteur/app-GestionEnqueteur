import ApiMesureResponse from "../models/ApiMesureResponse";
import Mesure from "../models/Mesure";
import MesureInterface from "../models/MesureInterface";
import MesureBsc from "../models/bsc/MesureBsc";
import MesureBscInterface from "../models/bsc/MesureBscInterface";

export default class MesureFactory {

  static isValidReponseApi(dataApi: unknown): dataApi is ApiMesureResponse {

    return (typeof dataApi === "object" && 
      dataApi !== null && 
      'attributes' in dataApi 
    )
  }

  static createMesureFromApi(dataApi: unknown): Mesure {
    if (!MesureFactory.isValidReponseApi(dataApi)) {
      throw new Error("Type invalide");
    }

    switch (dataApi.attributes.__component) {
      case 'mesure.mesure-bsc':
        return MesureBsc.createMesureFromApi(dataApi);
      case 'mesure.mesure-mq':
        throw new Error("Not implemented");
      default:
        throw new Error("Mesure non supporté");
    }

  }

  static createMesure(type: string): Mesure {
    switch (type) {
      case "BSC":
        return new MesureBsc();
      case "MQ":
        throw new Error("Not implemented");
      default:
        throw new Error("Type invalide");
    }
  }

  static loadMesure(mesure: MesureInterface): Mesure {
    switch (mesure.type) {
      case "BSC":
        return new MesureBsc(mesure as MesureBscInterface);
      case "MQ":
        throw new Error("Not implemented");
      default:
        throw new Error("Type not supported");
    }
  }

}