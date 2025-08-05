import React from "react";
import { Image } from "react-native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  font,
  brand,
  surface_a10,
  smRadius,
  surface_a0,
  secondary_a0,
  secondary_a20,
  surface_a30,
  khusaRed,
} from "../../../Constants";
import { HomePage } from "./HomePage";
import { ReportPage } from "./ReportPage";
import { ProfilePage } from "./ProfilePage";
import { ResourcesPage } from "./ResourcesPage";
import { Search } from "./Search";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../../theme/styles.js";

const Tab = createBottomTabNavigator();

/**
 *
 * @returns The logo in the header of the main screens
 */
function LogoTitle() {
  return (
    <Image
      style={styles.headerImage}
      source={require("../../../assets/KHUSA-horiz-transparent.png")}
    />
  );
}

/**
 *
 * @returns All of the Screens inside of the Main Screen
 */
export function Main() {
  return (
    <Tab.Navigator
      prefersHomeIndicatorAutoHidden={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return (
              <MaterialIcons
                name="home"
                size={30}
                color={focused ? khusaRed : secondary_a20}
              />
            );
          } else if (route.name === "Report") {
            return (
              <MaterialIcons
                name="assignment"
                size={30}
                color={focused ? khusaRed : secondary_a20}
              />
            );
          } else if (route.name === "Search") {
            return (
              <MaterialIcons
                name="search"
                size={30}
                color={focused ? khusaRed : secondary_a20}
              />
            );
          } else if (route.name === "Resources") {
            return (
              <MaterialIcons
                name="book"
                size={30}
                color={focused ? khusaRed : secondary_a20}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <MaterialIcons
                name="account-circle"
                size={30}
                color={focused ? khusaRed : secondary_a20}
              />
            );
          }
        },
        headerTitle: () => <LogoTitle />,

        headerStyle: {
          backgroundColor: surface_a0,
          shadowColor: "transparent",
          height: brand === "Apple" ? 100 : 80,
        },

        tabBarStyle: {
          height: brand === "Apple" ? 85 : 75,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderTopColor: surface_a30,
          paddingBottom: brand === "Apple" ? 20 : 10,
          backgroundColor: surface_a0,
          keyboardHidesTabBar: true,
          fontFamily: font,
        },
        tabBarHideOnKeyboard: true,
        //tabBarInactiveBackgroundColor: surface_a10,
        //tabBarActiveBackgroundColor: surface_a30,
        tabBarActiveTintColor: khusaRed,

        gestureEnabled: false,
        tabBarShowLabel: true,
        backgroundColor: surface_a0,
        lazy: false,
        tabBarAllowFontScaling: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 4,
          paddingTop: 0,
          margin: 0,
          textAlign: "center",
          fontFamily: font,
        },
        tabBarItemStyle: {
          borderRadius: smRadius,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          //borderTopWidth: 4,
          //borderTopColor: khusaRed,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Resources" component={ResourcesPage} />
      <Tab.Screen name="Report" component={ReportPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}
