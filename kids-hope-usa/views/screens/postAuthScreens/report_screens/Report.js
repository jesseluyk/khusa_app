import "react-native-gesture-handler";
import React from "react";
import { khusaText, surface_a10 } from "../../../../Constants";
import { ReportPage1 } from "./ReportPage1";
import { ReportPage2 } from "./ReportPage2";
import { ReportPage3 } from "./ReportPage3";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: surface_a10,
  },
  headerTintColor: khusaText,
  headerBackTitle: "Back",
};

export const Report = () => {
  return (
    <Navigator initialRouteName="ReportPage1">
      <Screen
        name="ReportPage1"
        component={ReportPage1}
        options={{ title: "Report", ...screenOptions }}
      />
      <Screen
        name="ReportPage2"
        component={ReportPage2}
        options={{ title: null, ...screenOptions }}
      />
      <Screen
        name="ReportPage3"
        component={ReportPage3}
        options={{ title: null, ...screenOptions }}
      />
    </Navigator>
  );
};

export default Report;
