import { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

const CustomInput = ({
  label,
  placeholder,
  value,
  onTextChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onTextChange: (text: string) => void;
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      value={value}
      onChangeText={onTextChange} // Call the onTextChange callback function
    />
  </View>
);

const SearchTrain = () => {
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");

  const [searchType, setSearchType] = useState(0); // 0 for station, 1 for circulation number

  const toggleSearchType = () => {
    setSearchType((prevSearchType) => (prevSearchType === 0 ? 1 : 0)); // loop on slider
  };

  const handleSearch = () => {
    // todo Logic for search
    console.log("Search executed");
    console.log("Departure Station:", departureStation);
    console.log("Arrival Station:", arrivalStation);
    console.log("serviceNumber:", serviceNumber);

    // Reset input fields after search
    setDepartureStation("");
    setArrivalStation("");
    setServiceNumber("");
  };

  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        value={searchType === 1}
        onValueChange={toggleSearchType}
      />
      {searchType === 0 ? (
        <View style={styles.searchSection}>
          <CustomInput
            label="Gare de départ"
            placeholder="Entrez la gare de départ"
            value={departureStation}
            onTextChange={setDepartureStation}
          />
          <CustomInput
            label="Gare d'arrivée"
            placeholder="Entrez la gare d'arrivée"
            value={arrivalStation}
            onTextChange={setArrivalStation}
          />
        </View>
      ) : (
        <View style={styles.searchSection}>
          <CustomInput
            label="Numéro de circulation"
            placeholder="Entrez le numéro de circulation"
            value={serviceNumber}
            onTextChange={setServiceNumber}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  switch: {
    alignSelf: "center",
    marginBottom: 20,
  },
  searchSection: {
    marginBottom: 30,
  },

  label: {
    marginBottom: 4,
    fontSize: 16,
  },
});

export default SearchTrain;
