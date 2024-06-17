import { Snackbar } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { snackBarState } from "../store/storeAtom";
import { StyleSheet, View } from "react-native";


export default function MainSnackBar() {
  const snackBar = useRecoilValue(snackBarState);

  return (
    <View style={styles.container}>
      <Snackbar {...snackBar}>{snackBar.children}</Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative', 
    top: -80
  },
});
