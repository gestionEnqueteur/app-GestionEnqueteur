import Gare from "./Gare";

export default interface InfoHoraireCourse {
  departTrain?: Date;
  arriveTrain?: Date;
  gareOrigine?: Gare;
  gareTerminus?: Gare;
  departEnqueteur: Date;
  arriveEnqueteur: Date;
  gareDepartEnq: Gare;
  gareArriveEnq: Gare;
}
