import { useSetRecoilState } from "recoil";
import { snackBarState } from "../store/storeAtom";
import { SnackbarProps } from "react-native-paper";

// étendre SnackBarPros pour rendre onDismiss optionnel 
type CustomSnackBarProps = Omit<SnackbarProps, 'onDismiss' | 'visible'> & {
  onDismiss?: () => void;
};


export default function useSnackBar() {
  // je veux que l'utilisateur puis envoyé les props de SnackbarPros. mais remplir la fonction onDismmis de mon hook par défaut. comment faire.

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
      visible: true,
    })

  }
  return displaySnackBar;
}


