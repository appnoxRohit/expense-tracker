import React from "react";
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerItem,
} from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingScreen from "../screens/SettingScreen";
import { View, Text, StyleSheet, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Drawer = createDrawerNavigator();

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/userImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Rohit Bisht</Text>
        <Text style={styles.userEmail}>User.email@example.com</Text>
      </View>

      {/* ITEM SECTION */}
      <DrawerItem
        style={{ paddingBottom: 8 }}
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        icon={() => <AntDesign name="home" size={24} color="green" />}
      />
      <DrawerItem
        label="Edit"
        onPress={() => props.navigation.navigate("Settings")}
        icon={() => <Feather name="edit-3" size={24} color="green" />}
      />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate("Settings")}
        icon={() => <Ionicons name="help-circle" size={24} color="green" />}
      />
      <DrawerItem
        label="Prefrences"
        onPress={() => props.navigation.navigate("Settings")}
        icon={() => (
          <MaterialIcons name="room-preferences" size={24} color="green" />
        )}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate("Settings")}
        icon={() => <Ionicons name="settings" size={24} color="green" />}
      />

      <View style={styles.footer}>
        <Text
          style={{
            textDecorationLine: "underline",
            fontSize: 20,
            fontWeight: "bold",
            color: "#e70c0c",
          }}
        >
          Logout
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "white" },
        drawerType: "back",
        drawerActiveTintColor: "green",
      }}
    >
      <Drawer.Screen
        name="Tabs"
        options={{ title: "ExpenseTracker" }}
        component={TabNavigator}
      />
      <Drawer.Screen
        name="Settings"
        options={{ headerShown: true }}
        component={SettingScreen}
      />
      <Drawer.Screen
        name="Home"
        options={{ headerShown: true }}
        component={SettingScreen}
      />
      <Drawer.Screen
        name="nothomes"
        options={{ headerShown: true }}
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    color: "#195514",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  footer: {
    color: "red",
    marginTop: 20,
    paddingHorizontal: 20,

    alignItems: "center",
  },
});
