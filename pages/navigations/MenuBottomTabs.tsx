import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SettingsScreen from "../SaisiScreen";
import OngletsTopTabPlaniSaisi from "./OngletsTopTabsPlanifSaisi";
import ParamScreen from "../ParamScreen";

const Tab = createMaterialBottomTabNavigator();

export default function MenuBottomTabs(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="Vacation">
      <Tab.Screen
        name="Vacation"
        component={OngletsTopTabPlaniSaisi}
        options={{
          tabBarLabel: "Vacation",
          tabBarIcon: ({ color }): JSX.Element => (
            <MaterialCommunityIcons name="train" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Saisi"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Saisi",
          tabBarIcon: ({ color }): JSX.Element => (
            <MaterialCommunityIcons name="pen" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Param"
        component={ParamScreen}
        options={{
          tabBarLabel: "Paramètre",
          tabBarIcon: ({ color }): JSX.Element => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
