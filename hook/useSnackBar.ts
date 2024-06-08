import { useSetRecoilState } from "recoil";
import { snackBarState } from "../store/storeAtom";
import { SnackbarProps } from "react-native-paper";

type CustomSnackBarProps = Omit<SnackbarProps, 'onDismiss' | 'visible'> & {
  onDismiss?: () => void;
};

export default function useSnackBar() {

  const setSnackBar = useSetRecoilState(snackBarState)

  const displaySnackBar = (snackBarProps: CustomSnackBarProps) => {

    const { onDismiss, ...restProps } = snackBarProps;

    setSnackBar({
      ...restProps,
      onDismiss: () => {
        setSnackBar(prev => ({
          ...prev,
          visible: false,
        }));
        if (onDismiss) {
          onDismiss();
        }
      },
      action: snackBarProps.action ? snackBarProps.action : {
        label: "Fermer",
        onPress: () => {
          setSnackBar(prev => ({ ...prev, visible: false }));
        },
      },
      visible: true,
    })

  }
  return displaySnackBar;
}


