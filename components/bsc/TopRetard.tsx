import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

type Props = {
  labelInput: string;
  labelButton: string;
  time: Date;
  onChangeValue: (value: number) => void;
  defaultValue: number;
};

export default function TopRetard(props: Readonly<Props>) {
  const defaultValue = props.defaultValue ? props.defaultValue.toString() : "";
  const [valueInput, setValueInput] = useState(defaultValue);
  const [error, setError] = useState(false);

  const handleButton = () => {
    const currentTime = new Date();
    const retard = new Date(currentTime.getTime() - props.time.getTime());
    setValueInput(retard.getMinutes().toString());
    props.onChangeValue(retard.getMinutes());
    setError(false);
  };

  const handleOnChangeText = (newValue: string) => {
    // control de saisi
    const retard = +newValue;
    console.log(`Retard: ${retard}`);
    Number.isNaN(retard) ? setError(true) : setError(false);

    // update form
    setValueInput(newValue); // test
    props.onChangeValue(retard);
  };

  return (
    <View style={style.container}>
      <View style={style.half}>
        <TextInput
          label={props.labelInput}
          mode="outlined"
          value={valueInput}
          onChangeText={handleOnChangeText}
          error={error}
          keyboardType="number-pad"
        />
      </View>
      <View style={style.half}>
        <Button mode="contained" onPress={handleButton}>
          {props.labelButton}
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
