import InfoEnqueteur from "../InfoEnqueteur";
import InfoTrain from "./InfoTrain";
import Perturbation from "./Perturbation";
import Questionnaires from "./Questionnaire";
import Retard from "./Retard";

export default interface MesureBSC {
  infoEnqueteur?: InfoEnqueteur;
  infoTrain: InfoTrain;
  perturbation?: Perturbation;
  retards?: Retard;
  questionnaires?: Questionnaires;
  commentaireNoSuccess?: string;
}
