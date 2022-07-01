import React from "react";
import LoginButtons from "../pages/Login";
import BottomTabs from "./ParentBottomStack";
import Authenticate from "../pages/Authenticate";
import { DriverStack } from "./DriverStack";

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export const AuthStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="LoginButtons" component={LoginButtons}/>
      <Stack.Screen options={{headerShown: false}} name="Authenticate" component={Authenticate}/>
      <Stack.Screen options={{headerShown: false}} name="BottomTabs" component={BottomTabs}/>
      <Stack.Screen options={{headerShown: false}} name="DriverApp" component={DriverStack}/>
    </Stack.Navigator>
  );
};
