import { useState } from "react";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value?: number;
  onChangeValue?: (value: number) => void;
};

export default function (props: Props) {
  const { label, value, onChangeValue } = props;

  const [error, setError] = useState(false); 

  const conversionNumberToString = (value: number | undefined): string => {
    if (value && value !== 0) {
      return value.toString();
    }

    // si pas de valeur ou égale a zéro 
    return "";
  };

  // appeler au changemenmt du formulaire
  const handleInputChange = (newValue: string) => {
    //on convertir le string en number
    const valueNumeric = Number(newValue);
    if (Number.isInteger(valueNumeric)) {
      // c'est un nombre correct
      setError(false);
      if (onChangeValue) onChangeValue(valueNumeric);
    } else {
      // c'est un nombre incorrect
      setError(true);
    }
  };

  return (
    <TextInput
      label={label}
      mode="outlined"
      onChangeText={handleInputChange}
      inputMode="numeric"
      error={error}
      value={conversionNumberToString(value)}
      autoComplete="off"
      
    />
  );
}
