import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuBottomTabs, { TabParamList } from "./MenuBottomTabs";
import HomeScreen from "../HomeScreen";
import SaisieBscScreen from "../bsc/SaisieBscScreen";
import { NavigatorScreenParams } from "@react-navigation/native";

// type des param des pages
export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<TabParamList>;
  Test: undefined;
  SaisieBsc: { courseId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MyMainStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={MenuBottomTabs} />
      <Stack.Screen name="Test" component={HomeScreen} />
      <Stack.Screen name="SaisieBsc" component={SaisieBscScreen} />
    </Stack.Navigator>
  );
}
