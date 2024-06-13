import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { RecoilRoot } from "recoil";
import AppProvider from "./provider/AppProvider";
import StackNavigation from "./screens/navigations/StackNavigation";

export default function App() {
  return (
    <RecoilRoot>
      <PaperProvider>
        <AppProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </AppProvider>
      </PaperProvider>
    </RecoilRoot>
  );
}
