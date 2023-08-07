import Course from "../models/Course";
import TestMock from "./TestMock";

export default class StorageService {
  async getData(entity: string) {
    //TODO: faire la fonction getData
  }
  async postData(entity: string, data: any) {
    //TODO: faire la fonction postData
  }
  async updateData(entity: string, id: number, data: any) {
    //TODO: faire la fonction updateData
  }
  async deleteData(entity: string, id: number) {
    //TODO: faire la fonction deleteData
  }

  getAllCourse() {
    //TODO: crée la méthode pour récuperer tout les courses dans la database.

    return TestMock.getCourses();
  }
}
