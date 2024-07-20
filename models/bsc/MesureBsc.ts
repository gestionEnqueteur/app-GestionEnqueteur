import ApiMesureBscResponse from "../ApiMesureBscResponse";
import InfoEnqueteur from "../InfoEnqueteur";
import Mesure from "../Mesure";
import InfoTrain from "./InfoTrain";
import MesureBscInterface from "./MesureBscInterface";
import Perturbation from "./Perturbation";
import Questionnaires from "./Questionnaire";
import Retard from "./Retard";
export default class MesureBsc extends Mesure implements MesureBscInterface {
  infoEnqueteur!: InfoEnqueteur;
  infoTrain!: InfoTrain;
  perturbation?: Perturbation;
  retards!: Retard;
  questionnaires?: Questionnaires;
  commentaireNoSuccess?: string;

  constructor(mesureBsc: MesureBscInterface = {
    infoEnqueteur: {

    },
    infoTrain: {
      composition: "US",
      numMaterial: ""
    },
    retards: {

    },
    type: "BSC"
  }) {
    console.log("constructeur CourseBsc"); 
    super(mesureBsc);
    console.log("instanciation d'une mesure BSC");
  }

  convertDataToApi(): unknown {

    return {
      __component: "mesure.mesure-bsc",
      composition: this.infoTrain.composition,
      numMaterial: this.infoTrain.numMaterial,
      questionnaireDistribuess: this.questionnaires?.distribuees,
      questionnaireVides: this.questionnaires?.vides,
      questionnaireInexploitables: this.questionnaires?.inexploitables,
      questionnaireExploitables: this.questionnaires?.exploitables,
      retardDepart: this.retards.retardDepart,
      retardArrive: this.retards.retardArrive,
      gareMonte: this.infoEnqueteur.gareMonteeReel,
      gareDescente: this.infoEnqueteur.gareDescenteReel

    }
  }
  static createMesureFromApi(dataApi: unknown): MesureBsc {
    if (!this.isValidReponseApi(dataApi)) {
      throw new Error("Format invalide");
    }
    const newMesureInterface: MesureBscInterface = {
      infoEnqueteur: {
        gareMonteeReel: dataApi.attributes.gareMonte,
        gareDescenteReel: dataApi.attributes.gareDescente,
      },
      infoTrain: {
        numMaterial: dataApi.attributes.numMaterial,
        composition: ["US", "UM2", "UM3"].includes(dataApi.attributes.composition)
          ? dataApi.attributes.composition as ("US" | "UM2" | "UM3")
          : "US"
      },
      retards: {
        retardDepart: dataApi.attributes.retardDepart,
        retardArrive: dataApi.attributes.retardArrive
      },
      type: dataApi.attributes.__component
    }

    return new MesureBsc(newMesureInterface);
  }

  static isValidReponseApi(dataApi: unknown): dataApi is ApiMesureBscResponse {

    if (
      typeof dataApi === 'object' &&
      dataApi !== null &&
      'id' in dataApi &&
      'attributs' in dataApi &&
      (dataApi as any).attributes.__component === "mesure.mesure-bsc"
    ) return true;
    else return false;

  }

}