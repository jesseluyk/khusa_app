import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import { khusaUrl } from "../../../Constants";
import { StandardButton } from "../../../components/StandardButton.js";
import AuthContext from "../../../context/authContext/AuthContext";
import TransitionScreen from "../../../components/TransitionScreen.js";
import styles from "../../../theme/styles.js";
import NetInfo from "@react-native-community/netinfo";
import { PageHeading } from "../../../components/PageHeading.js";
import { FullScreenMsg } from "../../../components/FullScreenMsg.js";

export const ContactSupport = (props) => {
  const [comment, setComment] = useState();
  const { userId, userToken } = useContext(AuthContext);
  const [sending, setSending] = useState(false);

  let generateData = async () => {
    let formData = new FormData();
    formData.append("user_id", userId);
    formData.append("message", comment);

    const response = await fetch(khusaUrl + "contact", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
      body: formData,
    });

    if (!response.ok) {
      console.log("ERROR");
      alert("Something has gone wrong. Please try again later.");
      setSending(false);
      return;
    }
    const json = await response.json();

    Alert.alert(
      "Complete",
      "Thank you for submitting your question to Kids Hope USA!"
    );

    setSending(false);
  };

  //navigates to the specified screen
  async function handleClick(location) {
    setSending(true);
    const result = await generateData();
    props.navigation.navigate(location);
  }

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

  if (!isConnected) {
    return (
      <FullScreenMsg msg="Please connect to the internet to submit a report." />
    );
  }

  if (sending) {
    return <TransitionScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          margin: 0,
        }}
        contentContainerStyle={{
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
        <PageHeading title="Contact Support" />

        <View style={styles.section}>
          <Text style={styles.basicText}>Send us a message</Text>
        </View>
        <View style={styles.section}>
          <TextInput
            inputMode="text"
            editable
            multiline
            numberOfLines={16}
            onChangeText={(text) => setComment(text)}
            comment={comment}
            style={styles.inputMed}
            numberOfLines={10}
          />
        </View>
        <StandardButton onPress={() => handleClick("Main")}>
          Submit
        </StandardButton>
      </ScrollView>
    </View>
  );
};

export default ContactSupport;
