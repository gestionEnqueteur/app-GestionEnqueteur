import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppProvider from "./provider/AppProvider";
import StackNavigation from "./screens/navigations/StackNavigation";
import MainSnackBar from "./components/MainSnackBar";

export default function App() {
  return (
      <PaperProvider>
        <AppProvider>
          <NavigationContainer>
            <StackNavigation />
            <MainSnackBar />
          </NavigationContainer>
        </AppProvider>
      </PaperProvider>
  );
}
