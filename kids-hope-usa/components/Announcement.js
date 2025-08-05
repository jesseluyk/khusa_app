import React from "react";
import { Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "../theme/styles";
function Announcement({ text, color, icon }) {
  return (
    <View style={styles.announcement}>
      <View style={styles.leftSection}>
        <MaterialIcons style={styles.leftIcon} name={icon} color={color} />
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.announcementText}>{text}</Text>
      </View>
    </View>
  );
}

export default Announcement;
