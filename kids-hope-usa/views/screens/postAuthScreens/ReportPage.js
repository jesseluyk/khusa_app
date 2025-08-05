import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { StandardButton } from "../../../components/StandardButton.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import styles from "../../../theme/styles.js";
import { PageHeading } from "../../../components/PageHeading";
import { FullScreenMsg } from "../../../components/FullScreenMsg.js";

export const ReportPage = ({ navigation }) => {
  const [allUser, setAllUser] = useState([]);

  async function getAllUser() {
    try {
      const allUserString = await AsyncStorage.getItem("allUser");
      const allUserData = JSON.parse(allUserString);
      setAllUser(allUserData.data);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);

  //detects if the user is connected to the internet
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handlePress = () => {
    navigation.navigate("ReportScreen");
  };
  var reportCheck = allUser.reportMsg;

  if (!isConnected) {
    return (
      <FullScreenMsg msg="Please connect to the internet to submit a report." />
    );
  }
  if (reportCheck == 1) {
    return (
      <View style={styles.container}>
        <PageHeading title="Progress Report" />
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Student</Text>
            <Text style={styles.cardText}>{allUser.student}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Teacher</Text>
            <Text style={styles.cardText}>{allUser.teacher}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Director</Text>
            <Text style={styles.cardText}>{allUser.director}</Text>
          </View>
        </View>
        <StandardButton onPress={handlePress}>
          Create New Report +
        </StandardButton>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{reportCheck}</Text>
        </View>
      </View>
    );
  }
};
