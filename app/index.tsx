// import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import StackNavigation from "../screens/navigations/StackNavigation";
import AppProvider from "../provider/AppProvider";
import { RecoilRoot } from "recoil";



export default function App() {
  return (
    <RecoilRoot>
      <PaperProvider>
        <AppProvider>
          {/* <NavigationContainer> */}
            <StackNavigation />
          {/* </NavigationContainer> */}
        </AppProvider>
      </PaperProvider>
    </RecoilRoot>
  );
}
