import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  mission: string;
};

export default function TypeCourse({ mission }: Readonly<Props>) {
  let icon: string;

  switch (mission) {
    case "BSC HDF":
      icon = "train";
      break;
    case "MQ HDF":
      icon = "bus";
      break;
    case "HLP Train":
      icon = "sleep";
      break;
    case "HLP VS":
      icon = "car";
      break;
    default:
      icon = "";
      break;
  }

  return (
    <View>
      <MaterialCommunityIcons name={icon} color="black" size={26} />
    </View>
  );
}
