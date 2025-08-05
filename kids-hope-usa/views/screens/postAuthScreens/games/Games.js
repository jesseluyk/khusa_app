import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../../../theme/styles.js";
import {
  khusaBlue,
  khusaDarkRed,
  khusaGreen,
  khusaRed,
  khusaYellow,
} from "../../../../Constants.js";
import { MaterialIcons } from "@expo/vector-icons";

export function Games({ navigation }) {
  //takes in a screen and navigates to it
  const handlePress = (game) => {
    navigation.navigate(game);
  };

  const games = [
    {
      id: 4,
      name: "Conversation Starters",
      destination: "ConversationStartersScreen",
      icon: "chat",
      color: khusaRed,
    },
    {
      id: 5,
      name: "Would You Rather?",
      destination: "WouldYouRatherScreen",
      icon: "question-answer",
      color: khusaYellow,
    },
    {
      id: 1,
      name: "Game Timer",
      destination: "TimerScreen",
      icon: "timer",
      color: khusaDarkRed,
    },
    {
      id: 2,
      name: "Spinner",
      destination: "SpinnerScreen",
      icon: "change-circle",
      color: khusaGreen,
    },
    {
      id: 3,
      name: "30 Second Dance Party",
      destination: "DancePartyScreen",
      icon: "music-note",
      color: khusaBlue,
    },
  ];

  const Box = (item) => {
    let icon = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.box,
          {
            //backgroundColor: item.color !== undefined ? item.color : khusaRed,
          },
        ]}
        onPress={() => handlePress(item.destination)}
      >
        <Text style={styles.boxLabel}>{item.name}</Text>
        {icon && (
          <MaterialIcons
            style={[
              styles.backgroundIcon,
              { color: item.color !== undefined ? item.color : khusaRed },
            ]}
            name={icon}
          />
        )}
      </TouchableOpacity>
    );
  };

  //screen that lists all the available games
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flexBoxSingle}>
          {games.map((game) => Box(game))}
        </View>
      </ScrollView>
    </View>
  );
}
