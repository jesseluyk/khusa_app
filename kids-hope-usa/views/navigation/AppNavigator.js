import React, { useContext } from "react";
import PreAuthNavigator from "./preAuthNavigator";
import PostAuthNavigator from "./postAuthNavigator";
import AuthContext from "../../context/authContext/AuthContext";
import TransitionScreen from "../../components/TransitionScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  const authContext = useContext(AuthContext);
  const { userToken, isLoading, userId } = authContext;

  if (isLoading) {
    return <TransitionScreen />;
  }

  return (
    <NavigationContainer navigationInChildEnabled>
      <Navigator>
        {userToken == null || userId == null ? (
          <Screen
            name="PreAuth"
            component={PreAuthNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Screen
            name="PostAuth"
            component={PostAuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
