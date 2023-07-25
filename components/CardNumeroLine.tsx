import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useState, useEffect } from "react";

type Props = {
  lineNumber: string;
};

export default function CardNumeroLine(props: Props): JSX.Element {
  const { lineNumber } = props;

  // state
  const [backgroundColor, setBackgroundColor] = useState<string>("gray");
  const [textColor, setTextColor] = useState<string>("black");

  useEffect((): void => {
    // choix couleur
    const firstLetter: string = lineNumber[0];

    // switch
    switch (firstLetter) {
      case "K":
        setBackgroundColor("red");
        break;
      case "C":
        setBackgroundColor("blue");
        setTextColor("white");
        break;
      case "P":
        setBackgroundColor("green");
        break;
    }
  }, [lineNumber]);

  const style = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      padding: 5,
      borderRadius: 10,
    },
    text: {
      fontSize: 20,
      color: textColor,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.text}>{lineNumber}</Text>
    </View>
  );
}
