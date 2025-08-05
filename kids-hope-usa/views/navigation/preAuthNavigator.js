import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/preAuthScreens/welcomeScreen";

const PreAuthNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName="Welcome">
      <Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Navigator>
  );
};
export default PreAuthNavigator;
