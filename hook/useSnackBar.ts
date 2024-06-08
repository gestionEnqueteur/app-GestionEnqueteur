import { useSetRecoilState } from "recoil";
import { snackBarState } from "../store/storeAtom";
import { SnackbarProps } from "react-native-paper";

type CustomSnackBarProps = Omit<SnackbarProps, 'onDismiss' | 'visible'> & {
  onDismiss?: () => void;
};

/**
 * ce hook permet de modifier les props du composant CommunSnackBar qui est au top level de l'application
 * 
 * @returns renvoie la fonction displaySnackbar
 */
export default function useSnackBar() {

  const setSnackBar = useSetRecoilState(snackBarState)

  /**
   * cette fonction permet d'afficher la CommunSnackBar pendant un brief instanst, elle recoit en argument une props SnackBarProps modifié.
   * 
   * @param snackBarProps Props modifié de SnackbarProps, voir : https://callstack.github.io/react-native-paper/docs/components/Snackbar
   * ou l'attributs onDismiss est rendu facultative, et l'attribut visible, ne doit plus etre renseigné.
   */
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


