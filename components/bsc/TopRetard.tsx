import { useState } from "react"; 
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

type Props = {
  labelInput: string;
  labelButton: string; 
  time: Date; 
  onChangeValue: Function; 
}

export default function TopRetard(props: Readonly<Props>) {

  const [valueInput, setValueInput] = useState(0);

  const handleButton = () => {
    const currentTime = new Date(); 
    const retard = new Date(currentTime.getTime() - props.time.getTime()); 
    setValueInput(retard.getMinutes()); 
  }
  
  function handleInput(newValue: string) {

    try {
      const minuteRetard = Number(newValue);
      console.log(Number("")); 
      // géré le cas de la chaine vie == 0 . 
      if (!minuteRetard) {
        return; 
      } 
      setValueInput(minuteRetard); 
      props.onChangeValue(minuteRetard); // on fait remonter l'information au parents 
    }
    catch (Error) {
      setValueInput(0);  
    }

  }

  return (
    <View style={style.container}>
      <View style={style.half}>
        <TextInput label={props.labelInput} mode="outlined" value={valueInput.toString()} onChangeText={handleInput} />
      </View>
      <View style={style.half}>
        <Button mode="contained" onPress={handleButton}>{props.labelButton}</Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", 
    gap: 20
  },
  half: {
    flexDirection: "column",
    flex: 1, 
  },
});
