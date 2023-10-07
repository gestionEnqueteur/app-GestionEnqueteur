import { WebSQLDatabase, openDatabase } from "expo-sqlite";
import TestMock from "./TestMock";

export default class StorageService {
  private db: WebSQLDatabase | null;
  private fileSqlite: string;

  constructor() {
    this.fileSqlite = "db";
    this.db = openDatabase(
      this.fileSqlite,
      "V1",
      "storage téléphone",
      undefined,
      (db) => {
        console.log("ouverture DB");
        this.db = db;
      }
    );
  }

  testRequest() {
    this.db?.exec([{ sql: "SELECT 2 + 5, 8", args: [] }], false, (error, result) => {
      console.log("execution request SQL");
      console.log(result[0].rows);
    });
  }

 

  async getData(entity: string) {}
  async postData(entity: string, data: any) {
    //TODO: faire la fonction postData
  }
  async updateData(entity: string, id: number, data: any) {
    //TODO: faire la fonction updateData
  }
  async deleteData(entity: string, id: number) {
    //TODO: faire la fonction deleteData
  }

  async createDatabase() {
    //TODO: création de la BDD
    this.db?.exec([{sql: `CREATE TABLE course (
      id INT PRIMARY KEY NOT NULL, 
      mission VARCHAR(255), 
      pds VARCHAR(255), 
      vac VARCHAR(255), 
      affectation VARCHAR(255),
      status VARCHAR(255), 
      ligne VARCHAR(255),
      service VARCHAR(255), 
      objectif INT, 
      commentaire TEXT
    );`, args: []}], false, (error, result) => {
      console.log(result);
    })
  }
  dropDatabase() {
    //TODO: supression de la BDD
  }

  /**
   *
   * @returns the list des courses from mock
   * @deprecated ne pas utiliser, sera supprimer très prochainement !!!!
   */
  getAllCourse() {
    //TODO: supprimer la fonction

    return TestMock.getCourses();
  }
}
