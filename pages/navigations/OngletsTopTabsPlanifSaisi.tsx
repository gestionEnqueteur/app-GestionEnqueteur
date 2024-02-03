import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TrainPlanifieScreen from "../TrainPlanifieScreen";
import TrainASaisiScreen from "../TrainASaisiScreen";

export type TabVacParamList = {
  trainPlanifie: undefined; 
  trainASaisi: undefined;
}

const Tab = createMaterialTopTabNavigator<TabVacParamList>();

export default function OngletsTopTabPlaniSaisi() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="trainPlanifie" component={TrainPlanifieScreen} />
      <Tab.Screen name="trainASaisi" component={TrainASaisiScreen} />
    </Tab.Navigator>
  );
}
