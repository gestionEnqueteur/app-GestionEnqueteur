import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TrainPlanifieScreen from "../TrainPlanifieScreen";
import TrainASaisiScreen from "../TrainASaisiScreen";

const Tab = createMaterialTopTabNavigator();

export default function OngletsTopTabPlaniSaisi() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="trainPlanifié" component={TrainPlanifieScreen} />
      <Tab.Screen name="trainASaisi" component={TrainASaisiScreen} />
    </Tab.Navigator>
  );
}
