import { useState } from "react";
import {
  View,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Button, IconButton } from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";

export default function SearchTrainScreen() {
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [numberCirculation, setNumberCirculation] = useState("");
  const [isModeSearchNumberTrain, setIsModeSearchNumberTrain] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const toggleModeSearch = () => {
    setIsModeSearchNumberTrain((prevMode) => !prevMode);
  };

  const handleSearch = () => {
    // TODO: Logic for search
  };

  const onTimeDismiss = () => {
    setIsTimePickerVisible(false);
  };

  const onTimeConfirm = ({
    hours,
    minutes,
  }: {
    hours: number;
    minutes: number;
  }) => {
    let newDate = new Date();
    if (selectedDate?.getDate()) {
      newDate.setDate(selectedDate.getDate());
    }
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setSelectedDate(newDate);

    setIsTimePickerVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Gare</Text>
          <Switch
            style={styles.switch}
            value={isModeSearchNumberTrain}
            onValueChange={toggleModeSearch}
          />
          <Text style={styles.label}>N° de Train</Text>
        </View>
        {isModeSearchNumberTrain ? (
          <View style={styles.searchCirculation}>
            <TextInput
              mode="outlined"
              placeholder="Entrez le numéro de circulation"
              label="Numéro de circulation"
              onChangeText={(newValue) => setNumberCirculation(newValue)}
              value={numberCirculation}
              keyboardType="number-pad"
            />
          </View>
        ) : (
          <View style={styles.searchSection}>
            <TextInput
              style={styles.inputDepartureStation}
              mode="outlined"
              label="Gare de départ"
              placeholder="Entrez la gare de départ"
              value={departureStation}
              onChangeText={(newValue) => setDepartureStation(newValue)}
            />
            <TextInput
              mode="outlined"
              label="Gare d'arrivée"
              placeholder="Entrez la gare d'arrivée"
              value={arrivalStation}
              onChangeText={(newValue) => setArrivalStation(newValue)}
            />
            <View style={styles.searchTime}>
              <IconButton
                style={styles.clockIcon}
                onPress={() => setIsTimePickerVisible(true)}
                icon="clock-outline"
                size={50}
              />
              <Text>
                {`${selectedDate
                  ?.getHours()
                  .toString()
                  .padStart(2, "0")} : ${selectedDate
                  ?.getMinutes()
                  .toString()
                  .padStart(2, "0")}`}
              </Text>
            </View>

            <TimePickerModal
              visible={isTimePickerVisible}
              onDismiss={onTimeDismiss}
              onConfirm={onTimeConfirm}
              hours={selectedDate?.getHours()}
              minutes={selectedDate?.getMinutes()}
              label="Sélectionner l'heure"
              cancelLabel="Annuler"
              confirmLabel="Confirmer"
              animationType="fade"
            />
          </View>
        )}
        <View style={styles.dateTimeContainer}>
          <DatePickerInput
            locale="fr"
            label="Sélectionner Date"
            value={selectedDate}
            onChange={(newValue: Date | undefined) => {
              if (newValue && selectedDate) {
                let newDate = new Date(newValue.getTime());
                newDate.setHours(selectedDate.getHours());
                newDate.setMinutes(selectedDate.getMinutes());
                setSelectedDate(newDate);
              }
            }}
            inputMode="start"
          />
        </View>
        <View style={styles.submit}>
          <Button mode="contained" onPress={handleSearch}>
            Rechercher
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 30,
  },
  switch: {
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
  },
  searchSection: {
    marginBottom: 10,
  },
  dateTimeContainer: {
    alignItems: "center",
  },
  selectedTimeText: {
    fontSize: 16,
    marginLeft: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  inputDepartureStation: {
    marginBottom: 15,
  },
  submit: {
    marginTop: 50,
  },
  searchTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  clockIcon: {
    marginRight: 10,
  },
  searchCirculation: {
    marginBottom: 50,
  },
});
