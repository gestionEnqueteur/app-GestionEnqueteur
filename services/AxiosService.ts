import axios, { AxiosInstance } from "axios";
import { log } from "console";

export default class AxiosService {
  private urlApi: string;
  private instanceAxios: AxiosInstance;

  constructor(urlApi: string) {
    this.urlApi = urlApi;
    this.instanceAxios = axios.create({
      baseURL: this.urlApi,
    });
  }

  pingService(): void {
    // TODO : Ajouter une route strapi quie permet de ping le back pour savoir si il est up
    console.log(
      `Service Axios: is running on port -> ${
        this.urlApi
      }, the instance BaseUrl is ${this.instanceAxios.getUri()}`
    );
  }

  setUrlApi(urlApi: string): void {
    this.urlApi = urlApi;
    this.setNewAxiosInstance(this.urlApi);
  }

  private setNewAxiosInstance(url: string): void {
    this.instanceAxios = axios.create({
      baseURL: this.urlApi,
    });
  }

  private getInstance(): AxiosInstance {
    return this.instanceAxios;
  }

  private checkValidUrl(axiosInstance: AxiosInstance): void {
    if (!axiosInstance.getUri()) {
      console.log("Pas d'url saisi");
      throw new Error("Url introuvable");
    }
    // TODO: ping sur l'api pour savoir sil elle est up ou joignable sinon renvoie une error
  }

  async getData(path: string): Promise<any> {
    const axiosInstance = this.getInstance();
    this.checkValidUrl(axiosInstance);
    try {
      const res = await axiosInstance.get(path);
      return res;
    } catch (err) {
      console.log("Error sur la requete GET :", err);
    }
  }

  async postData(path: string, data: any) {
    //TODO: faire la fonction postData
  }
  async updateData(path: string, id: number, data: any) {
    //TODO: faire la fonction updateData
  }
  async deleteData(path: string, id: number) {
    //TODO: faire la fonction deleteData
  }
}
