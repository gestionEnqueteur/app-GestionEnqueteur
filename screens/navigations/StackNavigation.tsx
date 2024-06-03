import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SaisieBscScreen from "@/screens/bsc/SaisieBscScreen";
import HomeScreen from "@/screens/HomeScreen";
import MenuBottomTabs, {
  TabParamList,
} from "@/screens/navigations/MenuBottomTabs";
import { NavigatorScreenParams } from "@react-navigation/native";

// type des param des pages
export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<TabParamList>;
  Test: undefined;
  SaisieBsc: { courseId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={MenuBottomTabs} />
      <Stack.Screen name="Test" component={HomeScreen} />
      <Stack.Screen name="SaisieBsc" component={SaisieBscScreen} />
    </Stack.Navigator>
  );
}
