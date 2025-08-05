import { Text, StyleSheet, View } from "react-native";
import { khusaText } from "../../../../Constants";

export default function Time({ time }) {
  //formats minutes
  const transformMinutes = () => {
    const convertedValue = Math.floor((time / 1000 / 60) % 60);
    const formattedValue = ("0" + convertedValue).slice(-2);
    return formattedValue;
  };

  //formats seconds
  const transformSeconds = () => {
    const convertedValue = Math.floor((time / 1000) % 60);
    const formattedValue = ("0" + convertedValue).slice(-2);
    return formattedValue;
  };

  if (time > 0) {
    return (
      <View style={styles.row}>
        <Text style={styles.time}>
          {transformMinutes()} : {transformSeconds()}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.row}>
        <Text style={styles.time}>00 : 00</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    allowFontScaling: false,
    textAlign: "center",
    alignText: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  time: {
    fontSize: 75,
    fontWeight: "bold",
    color: khusaText,
    width: "100%",
    alignSelf: "center",
  },
});
