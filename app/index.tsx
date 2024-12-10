import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./src/navigation/StackNavigator";
import { persistor, store } from "./src/store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigator />
    </GestureHandlerRootView>
  );
}
