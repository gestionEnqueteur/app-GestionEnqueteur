import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

import MenuBottomTabs, { TabParamList } from "./MenuBottomTabs";
import HomeScreen from "../HomeScreen";
import SaisiBscScreen from "../bsc/SaisiBscScren";

export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<TabParamList>;
  Test: undefined;
  SaisiBsc: {idCourse: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MyMainStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={MenuBottomTabs} />
      <Stack.Screen name="Test" component={HomeScreen} />
      <Stack.Screen name="SaisiBsc" component={SaisiBscScreen} />
    </Stack.Navigator>
  );
}
