import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import HomeScreen from "../HomeScreen";
import SaisieBscScreen from "../bsc/SaisieBscScreen";
import MenuBottomTabs, { TabParamList } from "./MenuBottomTabs";
import SearchTrainScreen from "../SearchTrainScreen";

// type des param des pages
export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<TabParamList>;
  Test: undefined;
  SaisieBsc: { courseId: number };
  SearchTrain: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={MenuBottomTabs} />
      <Stack.Screen name="Test" component={HomeScreen} />
      <Stack.Screen name="SaisieBsc" component={SaisieBscScreen} />
      <Stack.Screen name="SearchTrain" component={SearchTrainScreen} />
    </Stack.Navigator>
  );
}
