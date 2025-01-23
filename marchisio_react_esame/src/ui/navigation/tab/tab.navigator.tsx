import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParams, Screen } from "../types";
import { Ionicons } from "@expo/vector-icons";
import FavoritesScreen from "../../screens/notifications/favorites.screen";
import HomeScreen from "../../screens/home/home.screen";

const Tab = createBottomTabNavigator<TabParams>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerTintColor: "#FFFFFF",
          tabBarStyle: { backgroundColor: "#006B76" },
          headerShown: true,
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: "#006B76",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },

          tabBarIcon: ({ focused }) => {
            const iconName = () => {
              switch (route.name) {
                case Screen.Home:
                  return "home";
                case Screen.Favorites:
                  return "bookmark";
              }
            };
            return (
              <Ionicons
                name={iconName()}
                size={24}
                color={focused ? "#3579f6" : "#6d7075"}
              />
            );
          },
        };
      }}
    >
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
