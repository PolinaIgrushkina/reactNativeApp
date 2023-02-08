import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

import Home from "./Home";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen({ navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{
          title: "Публикации",
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
        }}
      />
    </NestedScreen.Navigator>
  );
}
