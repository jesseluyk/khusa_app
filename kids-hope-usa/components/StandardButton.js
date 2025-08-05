import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import {
  headingFont,
  khusaText,
  lgFont,
  shadow,
  smRadius,
  smSpace,
  surface_a10,
  surface_a30,
} from "../Constants.js";

export function StandardButton({ children, onPress, color, textColor }) {
  if (color === undefined) {
    color = surface_a10;
  }
  if (textColor === undefined) {
    textColor = khusaText;
  }
  return (
    <TouchableOpacity
      style={{
        allowFontScaling: false,
        justifyContent: "center",
        textAlign: "center",
        alginSelf: "center",
        borderColor: surface_a30,
        alignItems: "center",
        borderRadius: smRadius,
        margin: smSpace,
        padding: smSpace,
        shadowColor: shadow,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.2,
        elevation: 4,
        shadowRadius: 4,
        minHeight: 60,
        maxHeight: 150,
        backgroundColor: color,
      }}
      onPress={onPress}
    >
      <Text
        allowFontScaling={false}
        style={{
          color: textColor,
          fontSize: lgFont,
          textAlign: "center",
          fontFamily: headingFont,
          textTransform: "uppercase",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
