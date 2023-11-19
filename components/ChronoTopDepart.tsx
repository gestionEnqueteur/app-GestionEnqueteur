import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { calculDifferenceTime } from "../helpers/timeHelper";

enum FormatEnum {
  DATE,
  BEFORE_DEPARTURE,
  RUNNING_TRAIN,
}

enum ModeEnum {
  BEFORE_DEPARTURE,
  RUNNING_TRAIN,
  DATE_DISPLAY,
  AUTO,
}

type Props = {
  depart: Date;
  arrival: Date;
};

type State = {
  output: string;
  format: FormatEnum;
  mode: ModeEnum;
  delta: Date;
};

export default function ChronoTopDepart(props: Readonly<Props>) {
  const { depart, arrival } = props;

  // state global
  const [state, setState] = useState<State>({
    output: "init",
    format: FormatEnum.DATE,
    mode: ModeEnum.AUTO,
    delta: new Date(),
  });

  const sixtyMinuteBeforeDeparture = () => {
    // 60 minutes avant le départ
    const deltaBeforeDeparture = calculDifferenceTime(
      new Date(),
      depart
    );
    setState({
      ...state,
      delta: deltaBeforeDeparture,
      output: `${deltaBeforeDeparture.getMinutes()} min`,
    });

  }

  const timeBeforeArrival = () => {
    const deltaBeforeArrival = calculDifferenceTime(
      new Date(),
      arrival
    );

    setState({
      ...state,
      delta: deltaBeforeArrival, 
      output: `${deltaBeforeArrival.getHours()}:${deltaBeforeArrival.getMinutes()}`,
    }); 
  }

    const displayDate = () => {
      setState({
        ...state, 
        output: `${depart.getDate()}/${depart.getMonth() + 1}`
      }); 
    }

  const tick = () => {
    // fonction executer tous les secondes.

    // vérification du mode 



    //sixtyMinuteBeforeDeparture(); 
    //timeBeforeArrival(); 

    displayDate(); 

  };

  useEffect(() => {
    // iniT

    // mise en place du chrono.
    console.log("init");
    const intervalIdenfier = setInterval(tick, 1000);

    return () => {
      // suppression du setInterval
      clearInterval(intervalIdenfier);
      console.log("suppression");
    };
  }, []);

  return (
    <Avatar.Text label={state.output} size={64} labelStyle={{ fontSize: 16 }} />
  );
}
