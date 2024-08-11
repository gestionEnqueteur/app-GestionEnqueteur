import CourseBsc from "../../../models/bsc/CourseBsc";
import MesureBsc from "../../../models/bsc/MesureBsc";
import MesureBscInterface from "../../../models/bsc/MesureBscInterface";
import Mesure from "../../../models/Mesure";
import TestMock from "../../../services/TestMock";

describe("test mesure BSC", () => {
  test("instance de mesureBsc sans paramètre dans le contructeur", () => {
    const mesureTest = new MesureBsc();
    expect(mesureTest).toBeInstanceOf(MesureBsc);
    expect(mesureTest).toBeInstanceOf(Mesure);
  });

  test("instance de mesureBSC avec paramètre dans le constructeur", () => {
    const interfaceTest: MesureBscInterface = {
      type: "BSC",
      infoEnqueteur: {},
      infoTrain: {
        composition: "US",
        numMaterial: "TGV réseau",
      },
      retards: {},
    };

    const mesureTest = new MesureBsc(interfaceTest);

    expect(mesureTest).toBeInstanceOf(MesureBsc);
    expect(mesureTest).toBeInstanceOf(Mesure);

    expect(mesureTest.infoTrain.numMaterial).toBe("TGV réseau");
    expect(mesureTest.infoTrain.composition).toBe("US");
  });

  test("conversion DataApi", () => {
    const interfaceTest: MesureBscInterface = {
      infoEnqueteur: {
        gareMonteeReel: "PARIS",
        gareDescenteReel: "LONGUEAU",
      },
      infoTrain: {
        composition: "US",
        numMaterial: "B82400",
      },
      retards: {
        retardDepart: 5,
        retardArrive: 10,
      },
      questionnaires: {
        distribuees: 100,
        vides: 8,
        inexploitables: 2,
        exploitables: 90,
      },
      type: "BSC",
    };

    const mesureTest = new MesureBsc(interfaceTest);
    const dataApiToSend = mesureTest.convertDataToApi();

    expect(dataApiToSend).toMatchObject({
      __component: "mesure.mesure-bsc",
      composition: "US",
      numMaterial: "B82400",
      questionnaireDistribuess: 100,
      questionnaireVides: 8,
      questionnaireInexploitables: 2,
      questionnaireExploitables: 90,
      retardDepart: 5,
      retardArrive: 10,
      gareMonte: "PARIS",
      gareDescente: "LONGUEAU",
    });
  });

  test("lance une erreur si data api incorrect", () => {
    expect(() => {
      MesureBsc.createMesureFromApi("Data invalide");
    }).toThrow();
  });
});
