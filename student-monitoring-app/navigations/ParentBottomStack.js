import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import ParentViewDriverDetails from "../pages/ParentViewDriverDetails";
import ParentViewMap from "../pages/ParentViewMap";
import ParentViewSpeed from "../pages/ParentViewSpeed";

const location = require("../assets/Location.png");
const bus = require("../assets/bus.png");
const speed = require("../assets/speed.png");

const Tab = createBottomTabNavigator();


const imageStyle = focused => {
  return {
    width: 25,
    height: 25,
    // tintColor: focused ? "black" : "white",
  }
}

export default function BottomTabs({ }) {

  return (
    <Tab.Navigator
    screenOptions={{
        "tabBarActiveTintColor": "#000",
        "tabBarInactiveTintColor": "#fff",
        "tabBarActiveBackgroundColor": "#79b37e",
        "tabBarInactiveBackgroundColor": "#79b37e",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      }}
    >
      <Tab.Screen
        name="Location"
        component={ParentViewMap}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={location}
              resizeMode="contain"
              style={imageStyle(focused)}
            />
          ),
          headerShown : false,
        }}
        
      />
      <Tab.Screen name="Speed" component={ParentViewSpeed} options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={speed}
            resizeMode="contain"
            style={imageStyle(focused)}
          />
        ),
        headerShown : false,
      }}
        
      />
      <Tab.Screen name="Bus Details" component={ParentViewDriverDetails} options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={bus}
            resizeMode="contain"
            style={imageStyle(focused)}
          />
        ),
        headerShown : false

      }}/>

    </Tab.Navigator>
  );
}
