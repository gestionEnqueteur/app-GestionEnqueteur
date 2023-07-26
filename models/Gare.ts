import Ligne from "./Ligne";

export default interface Gare {
  id: number;
  name: string;
  lignes: Ligne[];
}
