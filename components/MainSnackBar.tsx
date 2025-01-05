import { Snackbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useStoreZustand } from "../store/storeZustand";


export default function MainSnackBar() {
  const snackBar = useStoreZustand(state => state.mainSnackBarProp);

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
