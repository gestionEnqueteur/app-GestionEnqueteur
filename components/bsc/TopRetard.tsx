import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import TextInputNumeric from "../TextInputNumeric";

type Props = {
  labelInput: string;
  labelButton: string;
  time: Date;
  onChangeValue: Function;
  defaultRetard: number;
};

export default function TopRetard(props: Readonly<Props>) {
  const { onChangeValue, labelButton, labelInput, time } = props;
  const [valueInput, setValueInput] = useState(0);

  const handleButton = () => {
    const currentTime = new Date();
    const retard = new Date(currentTime.getTime() - time.getTime());
    console.log(retard.getMinutes());
    setValueInput(retard.getMinutes());
  };

  function handleInput(newValue: number) {
    setValueInput(newValue);
    onChangeValue(newValue); // on fait remonter l'information au parents
  }

  return (
    <View style={style.container}>
      <View style={style.half}>
        <TextInputNumeric
          label={labelInput}
          onChangeValue={handleInput}
          value={valueInput}
        />
      </View>
      <View style={style.half}>
        <Button mode="contained" onPress={handleButton}>
          {labelButton}
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  half: {
    flexDirection: "column",
    flex: 1,
  },
});
