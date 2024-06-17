import ApiMesureResponse from "./ApiMesureResponse";
import MesureInterface from "./MesureInterface";
import MesureBsc from "./bsc/MesureBsc";
export default abstract class Mesure implements MesureInterface {

  type!: string;

  constructor(mesure: MesureInterface) {
    Object.assign(this, mesure);
  }

  toJson() {
    return { ...this };
  }

  abstract convertDataToApi(): unknown;

  static isValidReponseApi(dataApi: unknown): dataApi is ApiMesureResponse {

    return true; //TODO: a refactoriers
  }

  static createMesureFromApi(dataApi: unknown): Mesure {
    if (!Mesure.isValidReponseApi(dataApi)) {
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

}
