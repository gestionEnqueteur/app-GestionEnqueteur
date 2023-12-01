import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useState, useEffect } from "react";

type Props = {
  lineNumber: string;
};

type ColorCard = {
  background: string; // default gray
  text: string; // default black
};

export default function CardNumeroLine(props: Readonly<Props>) {
  const { lineNumber } = props;

  // state
  const [colorCard, setColorCard] = useState<ColorCard>({
    background: "gray",
    text: "black",
  });

  useEffect(() => {
    // choix couleur
    const firstLetter = lineNumber[0];

    // switch
    switch (firstLetter) {
      case "K":
        setColorCard({ background: "red", text: "black" });
        break;
      case "C":
        setColorCard({ background: "blue", text: "white" });
        break;
      case "P":
        setColorCard({ background: "green", text: "black" });
        break;
    }
  }, []);

  const style = StyleSheet.create({
    container: {
      backgroundColor: colorCard.background,
      padding: 5,
      borderRadius: 10,
    },
    text: {
      fontSize: 20,
      color: colorCard.text,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.text}>{lineNumber}</Text>
    </View>
  );
}
