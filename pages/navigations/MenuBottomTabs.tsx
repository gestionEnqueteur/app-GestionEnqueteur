import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SettingsScreen from '../SaisiScreen';
import OngletsTopTabPlaniSaisi, { TabVacParamList } from './OngletsTopTabsPlanifSaisi';
import ParamScreen from '../ParamScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Vacation: NavigatorScreenParams<TabVacParamList>;
  Saisi: undefined; 
  Param: undefined;
}

const Tab = createMaterialBottomTabNavigator();

export default function MenuBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Vacation"
    >
      <Tab.Screen
        name="Vacation"
        component={OngletsTopTabPlaniSaisi}
        options={{
          tabBarLabel: 'Vacation',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="train" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Saisi"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Saisi',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pen" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Param"
        component={ParamScreen}
        options={{
          tabBarLabel: 'Paramètre',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}