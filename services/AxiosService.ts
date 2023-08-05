import axios, { AxiosInstance } from "axios";

export default class AxiosService {
  private urlApi: string;
  private instanceAxios: AxiosInstance;

  constructor(urlApi: string) {
    this.urlApi = urlApi;
    this.instanceAxios = axios.create({
      baseURL: urlApi,
    });
  }
  setUrlApi(urlApi: string) {
    this.urlApi = urlApi;

    return this;
  }

  getInstance() {
    return this.instanceAxios;
  }

  async getData(path: string) {
    //TODO: faire la fonction getData
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
