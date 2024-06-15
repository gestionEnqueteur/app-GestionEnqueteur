import MesureBSC from "../models/bsc/MesureBsc";

// Définition du type CompositionType
type CompositionType = "US" | "UM2" | "UM3";

// Interface DataApi avec des propriétés optionnelles
interface DataApi {
  gareMonte: string;
  gareDescente: string;
  composition: CompositionType;
  numMaterial: string;
  retardDepart?: number;
  retardArrive?: number;
  questionnaireDistribuess?: number;
  questionnaireVides?: number;
  questionnaireInexploitables?: number;
  questionnaireExploitables?: number;
  commentaireNoSuccess?: string;
}

// Type guard pour vérifier si un objet est de type DataApi
function isDataApi(data: unknown): data is DataApi {
  // Vérification précoce du type
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // Destructuration des propriétés avec typage partiel
  const {
    gareMonte,
    gareDescente,
    composition,
    numMaterial,
    retardDepart,
    retardArrive,
    questionnaireDistribuess,
    questionnaireVides,
    questionnaireInexploitables,
    questionnaireExploitables,
    commentaireNoSuccess,
  } = data as Partial<DataApi>;

  // Validation des propriétés obligatoires
  const requiredPropertiesValid =
    typeof gareMonte === "string" &&
    typeof gareDescente === "string" &&
    typeof numMaterial === "string";

  if (!requiredPropertiesValid) {
    return false;
  }

  // Validation de la composition si définie
  const isValidComposition =
    composition === undefined || ["US", "UM2", "UM3"].includes(composition);

  if (!isValidComposition) {
    return false;
  }

  // Validation des propriétés numériques optionnelles
  const numericProperties: (number | undefined)[] = [
    retardDepart,
    retardArrive,
    questionnaireDistribuess,
    questionnaireVides,
    questionnaireInexploitables,
    questionnaireExploitables,
  ];

  const optionalNumericPropertiesValid = numericProperties.every(
    (prop) => prop === undefined || typeof prop === "number"
  );

  if (!optionalNumericPropertiesValid) {
    return false;
  }

  // Validation de la propriété de type chaîne optionnelle
  const optionalStringPropertyValid =
    commentaireNoSuccess === undefined ||
    typeof commentaireNoSuccess === "string";

  if (!optionalStringPropertyValid) {
    return false;
  }

  // Si toutes les validations passent, retourner true
  return true;
}




export default class MesureService {
  static factoriesMesureBscEmpty(): MesureBSC {
    throw new Error("fonction à implémenter");
  }

  /**
   * Convertit les données provenant de l'API en un objet MesureBSC.
   * @param dataApi Les données provenant de l'API à transformer.
   * @returns Un objet MesureBSC ou undefined si les données ne sont pas valides.
   * @throws Error si les données ne sont pas au format attendu.
   */
  static createObjetStateFromApi(dataApi: unknown): MesureBSC | undefined {
    if (!isDataApi(dataApi)) {
      throw new Error("Invalid data format");
    }

    const {
      gareMonte,
      gareDescente,
      composition,
      numMaterial,
      retardDepart = 0,
      retardArrive = 0,
      questionnaireDistribuess = 0,
      questionnaireVides = 0,
      questionnaireInexploitables = 0,
      questionnaireExploitables = 0,
      commentaireNoSuccess = "",
    } = dataApi;

    return {
      infoEnqueteur: {
        gareMonteeReel: gareMonte,
        gareDescenteReel: gareDescente,
      },
      infoTrain: { composition, numMaterial },
      retards: { retardDepart, retardArrive },
      questionnaires: {
        distribuees: questionnaireDistribuess ?? 0,
        vides: questionnaireVides ?? 0,
        inexploitables: questionnaireInexploitables ?? 0,
        exploitables: questionnaireExploitables ?? 0,
      },
      commentaireNoSuccess,
    };
  }

  /**
   * Convertit un objet MesureBSC en un format adapté au transfert de données.
   * @param mesure L'objet MesureBSC à convertir.
   * @returns Un objet adapté au transfert de données.
   */
  static createDataTransfertObjet(mesure: MesureBSC) {
    const {
      infoTrain: { composition, numMaterial },
      retards: { retardDepart = 0, retardArrive = 0 },
      questionnaires,
      infoEnqueteur: { gareMonteeReel, gareDescenteReel },
      commentaireNoSuccess = "",
    } = mesure;

    return {
      __component: "mesure.mesure-bsc",
      composition,
      numMaterial,
      questionnaireDistribuess: questionnaires?.distribuees ?? 0,
      questionnaireVides: questionnaires?.vides ?? 0,
      questionnaireInexploitables: questionnaires?.inexploitables ?? 0,
      questionnaireExploitables: questionnaires?.exploitables ?? 0,
      retardDepart,
      retardArrive,
      gareMonte: gareMonteeReel,
      gareDescente: gareDescenteReel,
      commentaireNoSuccess,
    };
  }
}
