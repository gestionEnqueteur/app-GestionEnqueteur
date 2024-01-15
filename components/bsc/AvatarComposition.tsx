import { Avatar } from "react-native-paper";
import { CompositionEnum } from "../../models/enum";

export default function AvatarComposition({
  composition,
}: Readonly<{ composition: CompositionEnum }>) {
  let label: string;

  switch (composition) {
    case CompositionEnum.US:
      label = "US";
      break;
    case CompositionEnum.UM2:
      label = "UM2";
      break;
    case CompositionEnum.UM3:
      label = "UM3";
      break;
  }

  return <Avatar.Text label={label} size={40} />;
}
