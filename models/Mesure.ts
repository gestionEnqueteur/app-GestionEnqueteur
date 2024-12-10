import { immerable } from "immer";
import MesureInterface from "./MesureInterface";
export default abstract class Mesure implements MesureInterface {

  type!: string;

  static readonly [immerable] = true;

  constructor(mesure: MesureInterface) {
    console.log("constructeur Mesure"); 
    Object.assign(this, mesure);

  }

  abstract convertDataToApi(): unknown;



}
