import { Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native"; 
import { useContext } from "react";
import StorageService from "../services/StorageServices";
import { StorageContext } from "../provider/AppProvider";


export default function SaisiScreen() {

  const storage = useContext(StorageContext);


  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => storage?.testRequest()}>BSC</Button>
      <Button mode="contained" onPress={() => storage?.createDatabase()}>MQ</Button>
      <Button mode="contained" onPress={() => console.log("saisi autres")}>Autres</Button>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
