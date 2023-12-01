import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

type Props = {
  labelInput: string;
  labelButton: string;
  time: Date;
  onChangeValue: Function;
};

export default function TopRetard(props: Readonly<Props>) {
  const [valueInput, setValueInput] = useState(0);

  const handleButton = () => {
    const currentTime = new Date();
    const retard = new Date(currentTime.getTime() - props.time.getTime());
    setValueInput(retard.getMinutes());
  };

  return (
    <View style={style.container}>
      <View style={style.half}>
        <TextInput
          label={props.labelInput}
          mode="outlined"
          value={valueInput.toString()}
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
