import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParams, Screen } from "../types";
import HomeScreen from "../../screens/home/home.screen";
import { Ionicons } from "@expo/vector-icons";
import FavoritesScreen from "../../screens/notifications/favorites.screen";

const Tab = createBottomTabNavigator<TabParams>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIcon: ({ focused }) => {
          const iconName = route.name === Screen.Home ? "home" : "bookmark"; // Seleziona l'icona
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? "#3579f6" : "#6d7075"} // Cambia colore se selezionato
            />
          );
        },
      })}
    >
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
