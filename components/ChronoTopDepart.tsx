import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

type propsTimerRunning = {
  remainingTime: Date;
};

type propsBeforeDepature = {
  timeBeforeDeparture: Date;
};

type propsDisplayDate = {
  dateCourse: Date;
};

type props = {
  datetimeDepart: Date;
  datetimeArrival: Date;
  currentDatetime: Date;
};

enum VersionChrono {
  Running,
  BeforeDepature,
  Date,
}
// mode du chrono : date | 60 minute avant départ | temps restant | date

export default function ChronoTopDepart(props: props) {
  const { datetimeDepart, datetimeArrival, currentDatetime } = props;

  const [timeRemaningBeforeDepature, setTimeRemaningBeforeDeparture] = useState(
    new Date()
  );
  const [timeRemaningBeforeArrival, setTimeRemaningBefoireArrival] = useState(
    new Date()
  );
  const [versionChrono, setVersionChrono] = useState(VersionChrono.Date);

  const ONE_HOUR = new Date(0, 0, 0, 1);

  useEffect(() => {
    const isSixtyMinuteBeforeDeparture =
      currentDatetime.getTime() >
        datetimeDepart.getTime() - ONE_HOUR.getTime() &&
      currentDatetime.getTime() < datetimeDepart.getTime();

    const isTrainRunning = currentDatetime.getTime() > datetimeDepart.getTime() &&
    currentDatetime.getTime() < datetimeArrival.getTime(); 

    // choix du composant à afficher 
    if (isTrainRunning) {
      setVersionChrono(VersionChrono.Running);
    }
    else if (isSixtyMinuteBeforeDeparture ) {
      setVersionChrono(VersionChrono.BeforeDepature);
    }
    else {
      setVersionChrono(VersionChrono.Date); 
    }

    // calcul du temps avant départ
    setTimeRemaningBeforeDeparture(
      new Date(datetimeDepart.getTime() - currentDatetime.getTime())
    );
    // calcul du temps avant arrivé
    setTimeRemaningBefoireArrival(
      new Date(datetimeArrival.getTime() - currentDatetime.getTime())
    );
  }, [currentDatetime]);

  function TimerRunningTrain(propsTimerRunning: propsTimerRunning) {
    const timeRemaining = propsTimerRunning.remainingTime;
    return (
      <View style={style.container}>
        <Text style={style.reste}>RESTE</Text>
        <Text style={style.text}>
          {timeRemaining.getHours()}:{timeRemaining.getMinutes()}
        </Text>
      </View>
    );
  }

  function BeforeDepature(props: propsBeforeDepature) {
    return (
      <View style={style.container}>
        <Text style={style.text}>
          {timeRemaningBeforeDepature.getMinutes()}
        </Text>
        <Text style={style.reste}>Min</Text>
      </View>
    );
  }

  function DisplayDateCourse(props: propsDisplayDate) {
    return (
      <View style={style.container}>
        <Text style={style.text}>
          {datetimeDepart.getDate()}/{datetimeDepart.getMonth() + 1}
        </Text>
      </View>
    );
  }

  switch (versionChrono) {
    case VersionChrono.BeforeDepature:
      return <BeforeDepature timeBeforeDeparture={timeRemaningBeforeDepature} />;
    case VersionChrono.Running:
      return <TimerRunningTrain remainingTime={timeRemaningBeforeArrival} />;
    default:
      return <DisplayDateCourse dateCourse={datetimeDepart} />;
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 2,
    height: 61,
    width: 61,
  },
  text: {
    color: "white",
    fontSize: 19,
    bottom: 4,
  },
  reste: {
    fontSize: 10,
    color: "white",
    top: -2,
  },
});
