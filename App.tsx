import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import ConfigurationProvider from "./provider/ConfigurationProvider";
import MyMainStack from "./pages/navigations/StackNavigation";

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <ConfigurationProvider>
        <NavigationContainer>
          <MyMainStack />
        </NavigationContainer>
      </ConfigurationProvider>
    </PaperProvider>
  );
}
