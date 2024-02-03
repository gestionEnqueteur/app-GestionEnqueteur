import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MyMainStack from "./pages/navigations/StackNavigation";
import AppProvider from "./provider/AppProvider";
import { RecoilRoot } from "recoil";



export default function App() {
  return (
    <RecoilRoot>
      <PaperProvider>
        <AppProvider>
          <NavigationContainer>
            <MyMainStack />
          </NavigationContainer>
        </AppProvider>
      </PaperProvider>
    </RecoilRoot>
  );
}
