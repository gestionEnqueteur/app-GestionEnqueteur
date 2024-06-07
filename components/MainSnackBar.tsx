import { Snackbar } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { snackBarState } from "../store/storeAtom";
import { StyleSheet, View } from "react-native";


export default function MainSnackBar() {
  const snackBar = useRecoilValue(snackBarState);

  console.log("props snackBar au montage du componsant MainSnackBar: ");
  console.log(snackBar);
  console.log("-----------");

  // Ajout du style au SnackBar
  return (
    <View style={styles.container}>
      <Snackbar {...snackBar} >{snackBar.children}</Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative', 
    top: -80
  },
});
