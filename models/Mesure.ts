import MesureInterface from "./MesureInterface";

export default abstract class Mesure implements MesureInterface {

  type!: string; 

  constructor(mesure: MesureInterface) {
    Object.assign(this, mesure); 
  }

  toJson() {
    return { ...this}; 
  }

  abstract convertDataToApi(): unknown; 

  abstract createMesureFromApi(dataApi: unknown): Mesure; 
}
