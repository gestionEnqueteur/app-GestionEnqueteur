import Gare from "./Gare";

export default interface InfoHoraireCourse {
  DepartTrain: Date;
  ArriveTrain: Date;
  GareOrigine: Gare;
  GareTerminus: Gare;
  DepartEnqueteur: Date;
  ArriveEnqueteur: Date;
  GareDepartEnq: Gare;
  GareArriveEnq: Gare;
}
