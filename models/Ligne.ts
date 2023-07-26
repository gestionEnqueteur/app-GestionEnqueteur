import Gare from "./Gare";

export default interface Ligne {
  id: number;
  name: string;
  gares: Gare[];
}
