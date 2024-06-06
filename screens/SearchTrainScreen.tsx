import { useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function SearchTrainScreen() {
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [numberCirculation, setNumberCirculation] = useState("");
  const [isModeSearchNumberTrain, setIsModeSearchNumberTrain] = useState(false);

  const toggleModeSearch = () => {
    setIsModeSearchNumberTrain((prevMode) => !prevMode);
  };

  const handleSearch = () => {
    // TODO: Logic for search
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Numéro de Train</Text>
        <Switch
          style={styles.switch}
          value={isModeSearchNumberTrain}
          onValueChange={toggleModeSearch}
        />
      </View>
      {isModeSearchNumberTrain ? (
        <View style={styles.searchSection}>
          <TextInput
            mode="outlined"
            placeholder="Entrez le numéro de circulation"
            label="Numéro de circulation"
            onChangeText={setNumberCirculation}
            value={numberCirculation}
            keyboardType="number-pad"
          />
        </View>
      ) : (
        <View style={styles.searchSection}>
          <TextInput
            mode="outlined"
            label="Gare de départ"
            placeholder="Entrez la gare de départ"
            value={departureStation}
            onChangeText={setDepartureStation}
          />
          <TextInput
            mode="outlined"
            label="Gare d'arrivée"
            placeholder="Entrez la gare d'arrivée"
            value={arrivalStation}
            onChangeText={setArrivalStation}
          />
        </View>
      )}
      <View>
        <Button mode="contained" onPress={handleSearch}>
          Rechercher
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  switch: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
  },
  searchSection: {
    marginBottom: 30,
  },
});
