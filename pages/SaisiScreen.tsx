import { Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function SaisiScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={(): void => console.log("saisi BSC")}>
        BSC
      </Button>
      <Button mode="contained" onPress={(): void => console.log("saisi MQ")}>
        MQ
      </Button>
      <Button
        mode="contained"
        onPress={(): void => console.log("saisi autres")}
      >
        Autres
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
