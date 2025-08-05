import React from "react";
import { Text, View } from "react-native";
import styles from "../theme/styles.js";
import { PrintButton } from "../utilities/PrintButton.js";

export function PageHeading({ title, printButton }) {
  return (
    <View style={styles.pageHeader}>
      {printButton && <View style={{ width: "25%" }}></View>}
      <Text style={styles.pageHeaderText}>{title}</Text>
      {printButton && (
        <View style={{ width: "25%", alignItems: "flex-end" }}>
          <PrintButton textColor="white" />
        </View>
      )}
    </View>
  );
}
