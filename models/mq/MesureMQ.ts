import Mesure from "../Mesure";
import MesureMqInterface from "./MesureMqInterface";


export default class MesureMq extends Mesure implements MesureMqInterface {
  convertDataToApi(): unknown {
    throw new Error("Method not implemented.");
  }
  
}