import * as SQLite from "expo-sqlite";
import TestMock from "./TestMock";
import Course from "../models/Course";

export default class StorageService {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase("db", "V1", "database", undefined, (db) => {
      console.log(`ouverture de la BD: ${db}`);
    });
  }

  async getData(entity: string) {}

  async getAllData() {
    this.db.exec(
      [{ sql: "SELECT * FROM course;", args: [] }],
      true,
      (error, result) => {
        if (error) {
          throw error;
        }

        // parcours des request.
        result?.forEach((item) => {
          if ("rows" in item) {
            const resultSet = item;
            console.log(resultSet.rows);
            // création de la liste des course
            const listCourse: Course[] = [];
            //parcours des course de result set
            resultSet.rows.forEach((courseSQL) => {
              console.info(courseSQL);
              const newCourse: Course = {
                id: courseSQL.id,
                affectation: courseSQL.affectation,
                mission: courseSQL.mission,
                objectif: courseSQL.objectif,
                pds: courseSQL.pds,
                vac: courseSQL.vac,
                service: courseSQL.service,
                status: courseSQL.status,
                infoHoraireCourse: {
                  datetimeDepartEnq: courseSQL.hd,
                  datetimeArriveEnq: courseSQL.ha,
                  gareDepartEnq: courseSQL.gareDepartEnq,
                  gareArriveEnq: courseSQL.gareArriveEnq,
                  gareOrigine: courseSQL.gareOrigine,
                  gareTerminus: courseSQL.gareTerminus,
                },
              };
              listCourse.push(newCourse);
            });
            return listCourse;
          } else {
            console.error("Erreur SQL");
          }
        });
      }
    );
  }

  async createDatabase() {
    this.db.exec(
      [
        {
          sql: `CREATE TABLE course (
      id INTEGER PRIMARY KEY, 
      mission VARCHAR(255), 
      pds VARCHAR(255), 
      vac VARCHAR(255), 
      affectation VARCHAR(255),
      status VARCHAR(255), 
      ligne VARCHAR(255),
      objectif INT, 
      commentaire TEXT, 
      hd TEXT,
      ha TEXT, 
      gareDepartEnq TEXT, 
      gareArriveEnq TEXT,
      gareOrigine TEXT, 
      gareTerminus TEXT
    );`,
          args: [],
        },
      ],
      false,
      (error, result) => {
        console.log(result);
      }
    );
  }
  async insertCourse(course: Course) {
    console.log("tentative d'insertion");
    console.log(this.db);
    const result = await this.db.execAsync(
      [
        {
          sql: `
    INSERT INTO course (id, mission, pds, vac, affectation, status, service, objectif, hd, ha, gareDepartEnq, gareArriveEnq, gareOrigine, gareTerminus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ?, ?, ?) ;
    `,
          args: [
            course.id,
            course.mission,
            course.pds,
            course.vac,
            course.affectation,
            course.status,
            course.service,
            course.objectif,
            course.infoHoraireCourse?.datetimeDepartEnq,
            course.infoHoraireCourse?.datetimeArriveEnq,
            course.infoHoraireCourse?.gareDepartEnq,
            course.infoHoraireCourse?.gareArriveEnq,
            course.infoHoraireCourse?.gareOrigine,
            course.infoHoraireCourse?.gareTerminus,
          ],
        },
      ],
      false
    );
    console.log(result);
  }
  async dropDatabase() {
    const result = await this.db.execAsync(
      [
        {
          sql: `
    DROP TABLE course; 
    `,
          args: [],
        },
      ],
      false
    );
    console.log(result);
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
