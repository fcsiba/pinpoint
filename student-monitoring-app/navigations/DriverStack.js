import React from "react";
import DriverStudent from "../pages/DriverStudent";
import DriverMap from "../pages/DriverMap";
import LocationTracker from "../LocationTracker";
import LoginButtons from "../pages/Login";

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export const DriverStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="DriverStudent" component={DriverStudent}/>
      <Stack.Screen options={{headerShown: false}} name="DriverMap" component={DriverMap}/>
      {/* <Stack.Screen options={{headerShown: false}} name="track" component={LocationTracker}/> */}
    </Stack.Navigator>
  );
};
