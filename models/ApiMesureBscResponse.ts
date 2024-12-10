import ApiMesureResponse from "./ApiMesureResponse";

export default interface ApiMesureBscResponse extends ApiMesureResponse{
  id: number;
  attributes: {
    id: number;
    __component: "mesure.mesure-bsc";
    composition: string;
    numMaterial: string;
    questionnaireDistribuess: number;
    questionnaireVides: number;
    questionnaireInexploitables: number;
    questionnaireExploitables: number;
    retardDepart: number;
    retardArrive: number;
    gareMonte: string;
    gareDescente: string;
  }
}