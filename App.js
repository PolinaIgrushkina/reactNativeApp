import React, { useState, useCallback } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";

import Main from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main onLayout={onLayoutRootView} />
      </NavigationContainer>
    </Provider>
  );
}
