import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MyMainStack from "./pages/navigations/StackNavigation";
import AppProvider from "./provider/AppProvider";

export default function App() {
  return (
    <PaperProvider>
      <AppProvider>
        <NavigationContainer>
          <MyMainStack />
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}
