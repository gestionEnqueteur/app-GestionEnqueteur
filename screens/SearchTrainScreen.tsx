import { useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import {
  TextInput,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { formatTime } from "../helpers/formatHelper";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

export default function SearchTrainScreen() {
  const [formData, setFormData] = useState({
    departureStation: "",
    arrivalStation: "",
    numberCirculation: "",
    isModeSearchNumberTrain: false,
    selectedDate: new Date(),
    selectedTime: { hours: 0, minutes: 0 } ,
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleChange = (
    key: string,
    value: string | boolean | CalendarDate
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleModeSearch = () => {
    handleChange("isModeSearchNumberTrain", !formData.isModeSearchNumberTrain);
  };

  const handleSearch = () => {
    // TODO: Logic for search
  };

  const onDateDismiss = () => {
    setDatePickerVisible(false);
  };

  const onDateConfirm = (date: Date) => {
    handleChange("selectedDate", date);
    setDatePickerVisible(false);
  };

  const onTimeDismiss = () => {
    setTimePickerVisible(false);
  };

  const onTimeConfirm = ({ hours, minutes } : { hours: number, minutes: number}) => {
    handleChange("selectedTime", { hours, minutes });
    setTimePickerVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Gare</Text>
          <Switch
            style={styles.switch}
            value={formData.isModeSearchNumberTrain}
            onValueChange={() =>
              handleChange(
                "isModeSearchNumberTrain",
                !formData.isModeSearchNumberTrain
              )
            }
          />
          <Text style={styles.label}>N° de Train</Text>
        </View>
        {formData.isModeSearchNumberTrain ? (
          <View style={styles.searchSection}>
            <TextInput
              mode="outlined"
              placeholder="Entrez le numéro de circulation"
              label="Numéro de circulation"
              onChangeText={(value) => handleChange("numberCirculation", value)}
              value={formData.numberCirculation}
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
              value={formData.departureStation}
              onChangeText={(value) => handleChange("departureStation", value)}
            />
            <TextInput
              mode="outlined"
              label="Gare d'arrivée"
              placeholder="Entrez la gare d'arrivée"
              value={formData.arrivalStation}
              onChangeText={(value) => handleChange("arrivalStation", value)}
            />
          </View>
        )}
        <View style={styles.dateTimeContainer}>
          <Button onPress={() => setTimePickerVisible(true)}>
            Choisir l'heure
          </Button>
          <Text style={styles.selectedDateText}>
            Heure sélectionnée:{" "}
            {formatTime(
              new Date(
                0,
                0,
                0,
                formData.selectedTime.hours,
                formData.selectedTime.minutes
              ).toISOString()
            )}
          </Text>
          <Button onPress={() => setDatePickerVisible(true)}>
            Choisir la Date
          </Button>
          <Text style={styles.selectedDateText}>
            Jour sélectionné: {formData.selectedDate.toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Button mode="contained" onPress={handleSearch}>
            Rechercher
          </Button>
        </View>
        <DatePickerModal
          locale="fr"
          mode="single"
          visible={isDatePickerVisible}
          onDismiss={onDateDismiss}
          date={formData.selectedDate}
          onConfirm={onDateConfirm}
          saveLabel="Confirmer"
          label="Sélectionner une date"
          animationType="slide"
        />

        <TimePickerModal
          visible={isTimePickerVisible}
          onDismiss={onTimeDismiss}
          onConfirm={onTimeConfirm}
          hours={formData.selectedTime.hours}
          minutes={formData.selectedTime.minutes}
          label="Sélectionner l'heure"
          cancelLabel="Annuler"
          confirmLabel="Confirmer"
          animationType="fade"
        />
      </View>
    </PaperProvider>
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
  dateTimeContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 16,
  },
  inputDepartureStation: {
    marginBottom: 15,
  },
});
