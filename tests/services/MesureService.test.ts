import MesureService from "../../services/MesureService";
import MesureBSC from "../../models/bsc/MesureBsc";

describe("test de MesureService", () => {
  test("createDataTransfertObjet doit convertir au format API", () => {
    // Préparation test
    const mesureTestBsc: MesureBSC = {
      infoEnqueteur: {
        gareMonteeReel: "Lille Flandres",
        gareDescenteReel: "Longueau",
      },
      infoTrain: {
        composition: "US",
        numMaterial: "16410",
      },
      retards: {
        retardDepart: 4,
        retardArrive: 8,
      },
      questionnaires: {
        distribuees: 90,
        vides: 6,
        inexploitables: 4,
        exploitables: 80,
      },
      commentaireNoSuccess: "Mesure Test",
    };

    const resultMesureApi = {
      __component: "mesure.mesure-bsc",
      composition: "US",
      numMaterial: "16410",
      questionnaireDistribuess: 90,
      questionnaireVides: 6,
      questionnaireInexploitables: 4,
      questionnaireExploitables: 80,
      retardDepart: 4,
      retardArrive: 8,
      gareMonte: "Lille Flandres",
      gareDescente: "Longueau",
      commentaireNoSuccess: "Mesure Test",
    };

    // Test

    expect(
      MesureService.createDataTransfertObjet(mesureTestBsc)
    ).toEqual(resultMesureApi);
  });

  test("test fonction CreateObjetStateFromApi", () => {
    const resultApi = {
      id: 0,
      __component: "mesure.mesure-bsc",
      composition: "UM2",
      numMaterial: "16410",
      questionnaireDistribuess: 30,
      questionnaireVides: 2,
      questionnaireInexploitables: 1,
      questionnaireExploitables: 27,
      retardDepart: 10,
      retardArrive: 15,
      gareMonte: "Longueau",
      gareDescente: "Paris",
      commentaireNoSuccess: "Mesure Test",
    };

    const mesureBscTransformed: MesureBSC = {
      infoEnqueteur: {
        gareMonteeReel: "Longueau",
        gareDescenteReel: "Paris",
      },
      infoTrain: {
        composition: "UM2",
        numMaterial: "16410",
      },
      retards: {
        retardDepart: 10,
        retardArrive: 15,
      },
      questionnaires: {
        distribuees: 30,
        vides: 2,
        inexploitables: 1,
        exploitables: 27,
      },
      commentaireNoSuccess: "Mesure Test",
    };

    expect(MesureService.createObjetStateFromApi(resultApi)).toEqual(
      mesureBscTransformed
    );

  });
});
