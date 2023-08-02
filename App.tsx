import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import ConfigurationProvider from "./provider/ConfigurationProvider";
import MyMainStack from "./pages/navigations/StackNavigation";
import CourseProvider from "./provider/CourseProvider";

export default function App() {
  return (
    <PaperProvider>
      <ConfigurationProvider>
        <CourseProvider>
          <NavigationContainer>
            <MyMainStack />
          </NavigationContainer>
        </CourseProvider>
      </ConfigurationProvider>
    </PaperProvider>
  );
}
