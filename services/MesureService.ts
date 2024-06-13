import MesureBSC from "../models/bsc/MesureBsc";

export default class MesureService {
  static factoriesMesureBscEmpty(): MesureBSC {
    // Cette méthode n'est pas encore implémentée
    throw new Error("fonction à implémenter");
  }

  static createObjetStateFromApi(dataApi: any): MesureBSC | undefined {
    const mesureBscTransformed: MesureBSC = {
      infoEnqueteur: {
        gareMonteeReel: dataApi.gareMonte,
        gareDescenteReel: dataApi.gareDescente,
      },
      infoTrain: {
        composition: dataApi.composition,
        numMaterial: dataApi.numMaterial,
      },
      retards: {
        retardDepart: dataApi.retardDepart ?? 0,
        retardArrive: dataApi.retardArrive ?? 0,
      },
      questionnaires: {
        distribuees: dataApi.questionnaireDistribuess ?? 0,
        vides: dataApi.questionnaireVides ?? 0,
        inexploitables: dataApi.questionnaireInexploitables ?? 0,
        exploitables: dataApi.questionnaireExploitables ?? 0,
      },
      commentaireNoSuccess: dataApi.commentaireNoSuccess || "",
    };

    return mesureBscTransformed;
  }

  static createDataTransfertObjet(mesure: MesureBSC) {
    const resultMesureApi = {
      __component: "mesure.mesure-bsc",
      composition: mesure.infoTrain.composition,
      numMaterial: mesure.infoTrain.numMaterial,
      questionnaireDistribuess: mesure.questionnaires?.distribuees ?? 0,
      questionnaireVides: mesure.questionnaires?.vides ?? 0,
      questionnaireInexploitables: mesure.questionnaires?.inexploitables ?? 0,
      questionnaireExploitables: mesure.questionnaires?.exploitables ?? 0,
      retardDepart: mesure.retards?.retardDepart ?? 0,
      retardArrive: mesure.retards?.retardArrive ?? 0,
      gareMonte: mesure.infoEnqueteur.gareMonteeReel,
      gareDescente: mesure.infoEnqueteur.gareDescenteReel,
      commentaireNoSuccess: mesure.commentaireNoSuccess,
    };

    return resultMesureApi;
  }
}
