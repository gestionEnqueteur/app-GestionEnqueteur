import { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { calculDifferenceTime } from "../helpers/timeHelper";


type Props = {
  depart: string;
  arrival: string;
};

export default function ChronoTopDepart(props: Readonly<Props>) {
  const depart = new Date(props.depart);
  const arrival = new Date(props.arrival);

  // state global
  const [output, setOutput] = useState("init");

  const sixtyMinuteBeforeDeparture = (currentTime: Date) => {
    // 60 minutes avant le départ
    const deltaBeforeDeparture = calculDifferenceTime(currentTime, depart);
    setOutput(`${deltaBeforeDeparture.getMinutes()} min`);
  };

  const timeBeforeArrival = (currentTime: Date) => {
    const deltaBeforeArrival = calculDifferenceTime(currentTime, arrival);

    setOutput(`${deltaBeforeArrival.getHours()}:${deltaBeforeArrival.getMinutes()}`);
  };

  const displayDate = () => {
    setOutput(`${depart.getDate()}/${depart.getMonth() + 1}`);
  };

  const tick = () => {
    // fonction executer tous les secondes.
    const currentTime = new Date();
    const ONE_HOUR = new Date(0, 0, 0, 1);
    const oneHoureBeforeDeparture = new Date(
      depart.getTime() - ONE_HOUR.getTime()
    );

    // vérification du mode
    if (
      currentTime.getTime() > oneHoureBeforeDeparture.getTime() &&
      currentTime.getTime() < depart.getTime()
    ) {
      // on affiche le chrono avant le départ.
      sixtyMinuteBeforeDeparture(currentTime);
    } else if (
      currentTime.getTime() > depart.getTime() &&
      currentTime.getTime() <= arrival.getTime()
    ) {
      // on affiche le temps restant avant arriver
      timeBeforeArrival(currentTime);
    } else {
      // on affiche la date
      displayDate();
    }
  };

  useEffect(() => {
    // iniT

    // mise en place du chrono.
    const intervalIdenfier = setInterval(tick, 1000);

    return () => {
      // suppression du setInterval
      clearInterval(intervalIdenfier);
    };
  }, []);

  return (
    <Avatar.Text label={output} size={64} labelStyle={{ fontSize: 16 }} />
  );
}
