import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuBottomTabs from './MenuBottomTabs';
import HomeScreen from '../HomeScreen';
import SaisiBscScreen from '../bsc/SaisiBscScren';


export type RootStackParamList = {
  HomeStack: undefined;
  Test: undefined;
  SaisiBsc: undefined
}


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


