import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { khusaRed, primary_a0, surface_a0 } from "../Constants";

const TransitionScreen = () => {
  return (
    <View style={Styles.container}>
      <ActivityIndicator size="large" color={khusaRed} />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: surface_a0,
    justifyContent: "center",
  },
});

export default TransitionScreen;
