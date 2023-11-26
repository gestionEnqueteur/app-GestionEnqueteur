import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuBottomTabs from './MenuBottomTabs';
import HomeScreen from '../HomeScreen';
import SaisiBscScreen from '../bsc/SaisiBscScren';

const Stack = createNativeStackNavigator();

export default function MyMainStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={MenuBottomTabs} />
      <Stack.Screen name="Test" component={HomeScreen} />
      <Stack.Screen name="SaisiBsc" component={SaisiBscScreen} />
    </Stack.Navigator>
  );
}

