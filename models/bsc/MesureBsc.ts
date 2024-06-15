import InfoEnqueteur from "../InfoEnqueteur";
import Mesure from "../Mesure";
import InfoTrain from "./InfoTrain";
import Perturbation from "./Perturbation";
import Questionnaires from "./Questionnaire";
import Retard from "./Retard";

export default interface MesureBSC extends Mesure {
  infoEnqueteur: InfoEnqueteur;
  infoTrain: InfoTrain;
  perturbation?: Perturbation;
  retards: Retard;
  questionnaires?: Questionnaires;
  commentaireNoSuccess?: string;
}


