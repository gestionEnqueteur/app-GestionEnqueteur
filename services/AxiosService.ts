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
      throw new Error("Url introuvable");
    }
    // TODO: ping sur l'api pour savoir sil elle est up ou joignable sinon renvoie une error
  }

  async getData(path: string): Promise<any> {
    const axiosInstance = this.getInstance();
    this.checkValidUrl(axiosInstance);

    try {
      const res = await axiosInstance.get(path);
      if (res.status === 200) return res;
    } catch (err: any) {
      throw new Error(`Err: Get Request failed: ${err.toJSON()}`);
    }
  }

  async postData(path: string, data: any): Promise<any> {
    const axiosInstance = this.getInstance();
    this.checkValidUrl(axiosInstance);

    if (!data) throw new Error("Err: no Data to Posted");

    try {
      const res = await axiosInstance.post(path, data);
      return res.status;
    } catch (err: any) {
      throw new Error(`Err: Post Request: ${err.toJSON()}`);
    }
  }
  async updateData(path: string, id: number, data: any) {
    const axiosInstance = this.getInstance();
    this.checkValidUrl(axiosInstance);

    if (!data) throw new Error("Err: no Data to Posted");

    try {
      const res = await axiosInstance.put(path + id, data);
      return res.status;
    } catch (err: any) {
      throw new Error(`Err: Update Request: ${err.toJSON()}`);
    }
  }
  async deleteData(path: string, id: number) {
    const axiosInstance = this.getInstance();

    try {
      const res = await axiosInstance.delete(path + id);
      return res.status;
    } catch (err: any) {
      throw new Error(`Err: Delete Request: ${err.toJSON()}`);
    }
  }
}
