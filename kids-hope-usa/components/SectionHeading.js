import React from "react";
import { Text } from "react-native";
import styles from "../theme/styles.js";

export function SectionHeading({ title }) {
  return <Text style={styles.h1}>{title}</Text>;
}
