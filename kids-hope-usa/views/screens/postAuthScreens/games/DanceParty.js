import React, { useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";
import { StandardButton } from "../../../../components/StandardButton.js";
import { font, khusaText } from "../../../../Constants";
import styles from "../../../../theme/styles.js";

export function DanceParty() {
  const [time, setTime] = useState(30);
  const [sound, setSound] = useState();
  const [status, setStatus] = useState();

  //creates new sound and plays it
  const newSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("./gameMusic.mp3"));
    setSound(sound);
    playSound(sound);
  };

  //enables sound to be played
  const playSound = async (audio) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    await audio.playAsync();
  };

  //handles time - prevents it from going past 0
  const handleTime = (thisTime) => {
    if (thisTime > 0) {
      return thisTime - 1;
    } else {
      handleStop();
      return thisTime;
    }
  };

  React.useEffect(() => {
    let timerID;
    if (status === 1) {
      timerID = setInterval(() => {
        setTime((time) => handleTime(time));
      }, 1000);
    } else {
      clearInterval(timerID);
    }
    return () => {
      clearInterval(timerID);
    };
  }, [status]);

  function handleStart() {
    setStatus(1);
  }
  function handleStop() {
    setStatus(0);
    setSound();
    setTime(30);
  }

  //prevents sound from playing more than once
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 150,
          paddingVertical: 100,
          fontFamily: font,
          color: khusaText,
        }}
      >
        {time}
      </Text>
      <StandardButton
        onPress={() => {
          handleStart();
          newSound();
        }}
      >
        Start Dance Party!
      </StandardButton>
    </View>
  );
}
