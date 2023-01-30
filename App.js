import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { Provider } from "react-redux";

import { useRoute } from "./router";
import { store } from "./redux/store";
import db from "./firebase/config";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  db.auth().onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
