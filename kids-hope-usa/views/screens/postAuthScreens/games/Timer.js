import { useState, useEffect } from "react";
import { Vibration, View, Text, TouchableOpacity } from "react-native";
import TimerHandler from "./TimerHandler";
import { Audio } from "expo-av";
import styles from "../../../../theme/styles.js";

const TIMER_INCREMENT = 10000; // Define a constant for the timer increment

export function Timer() {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(-1);
  const [sound, setSound] = useState();
  const [buttonText, setButtonText] = useState("Start");
  let timerID;

  //creates new sound and plays it
  const newSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("./ding.mp3"));
    setSound(sound);
    playSound(sound);
  };

  //enables sound to be played
  const playSound = async (audio) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: false });
    await audio.playAsync();
  };

  //prevents sound from playing more than once
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  //resets the timer to 0
  const reset = () => {
    handleStop();
    setTime(0);
  };

  if (time < 0) {
    Vibration.vibrate([0, 250, 500, 750, 1000, 1250], false);
    newSound();
    setTime(0);
    setStatus(-1);
  }

  //handles the states of the timer
  useEffect(() => {
    if (status === 1) {
      timerID = setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (status === -1) {
      clearInterval(timerID);
      reset();
    }
    return () => {
      clearInterval(timerID);
    };
  }, [status]);

  const handlePause = () => {
    if (time > 0) {
      setStatus((prevStatus) => (prevStatus === 0 ? 1 : 0));
      setButtonText((prevText) => (prevText === "Pause" ? "Start" : "Pause"));
    }
  };
  const handleStop = () => {
    setStatus(-1);
  };
  const increase = () => {
    setStatus(0);
    setTime((prevTime) =>
      prevTime <= 0 ? TIMER_INCREMENT : prevTime + TIMER_INCREMENT
    );
  };
  const decrease = () => {
    setTime((prevTime) => prevTime - TIMER_INCREMENT);
  };

  return (
    <View style={styles.container} allowFontScaling={false}>
      <View style={styles.pieGroup}>
        <View style={styles.time}>
          <TimerHandler time={time} />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            decrease();
          }}
        >
          <Text style={styles.h2}>-</Text>
        </TouchableOpacity>
        <Text style={styles.h2}>LENGTH</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            increase();
          }}
        >
          <Text style={styles.h2}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handlePause();
          }}
        >
          <Text style={styles.h2}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleStop();
          }}
        >
          <Text style={styles.h2}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
