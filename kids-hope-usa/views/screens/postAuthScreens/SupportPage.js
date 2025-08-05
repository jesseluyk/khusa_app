import React from "react";
import { TouchableOpacity, Text, ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../../theme/styles";
import {
  khusaBlue,
  khusaDarkRed,
  khusaGreen,
  khusaRed,
} from "../../../Constants";

function SupportPage({ navigation }) {
  const handlePress = (page) => {
    navigation.navigate(page);
  };
  const pages = [
    {
      name: "Ask a Child Counselor",
      destination: "WinningAtHome",
      icon: "child-care",
      color: khusaBlue,
    },
    {
      name: "Kids Hope USA Support",
      destination: "ContactSupport",
      icon: "help",
      color: khusaGreen,
    },
    /*
    {
      name: "Profile",
      destination: "Profile",
      icon: "account-circle",
      color: khusaGreen,
    },*/
  ];

  const Box = (item) => {
    let icon = item.icon;
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.box}
        onPress={() => handlePress(item.destination)}
      >
        <Text style={styles.boxLabel}>{item.name}</Text>
        {icon && (
          <MaterialIcons
            style={[
              styles.backgroundIcon,
              {
                color: item.color !== undefined ? item.color : khusaRed,
              },
            ]}
            name={icon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flexBoxSingle}>
          {pages.map((page) => Box(page))}
        </View>
      </ScrollView>
    </View>
  );
}

export default SupportPage;
