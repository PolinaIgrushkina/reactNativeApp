import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
