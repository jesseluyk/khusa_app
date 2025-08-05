import React from "react";
import { View, Text } from "react-native";
import { khusaText, surface_a0 } from "../Constants";

export function FullScreenMsg({ msg }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: surface_a0,
        padding: 20,
      }}
    >
      <Text style={{ color: khusaText, textAlign: "center", fontSize: 18 }}>
        {msg}
      </Text>
    </View>
  );
}
