import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import SettingScreen from "../screens/SettingScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import MainScreen from "../screens/MainScreen";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "../store/Store";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

export default function StackNavigator() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <NavigationContainer ref={navigationRef}> */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="Settings" component={SettingScreen} />
          {/* <Stack.Screen name="Home" component={MainScreen} /> */}
          <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} />
        </Stack.Navigator>
        {/* </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
}
