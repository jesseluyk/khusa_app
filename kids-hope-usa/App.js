import React from "react";
import AuthState from "./context/authContext/AuthState";
import AppNavigator from "./views/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthState>
        <AppNavigator />
      </AuthState>
    </SafeAreaProvider>
  );
};

export default App;
