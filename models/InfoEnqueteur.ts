import Gare from "./Gare";
import User from "./User";

export default interface InfoEnqueteur {
  enqueteur: User;
  numTablette?: string;
  gareMonteeReel: Gare;
  gaerDescenteReel: Gare;
}
