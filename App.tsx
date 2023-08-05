import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import ConfigurationProvider from "./provider/ConfigurationProvider";
import MyMainStack from "./pages/navigations/StackNavigation";
import CourseProvider from "./provider/CourseProvider";
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
