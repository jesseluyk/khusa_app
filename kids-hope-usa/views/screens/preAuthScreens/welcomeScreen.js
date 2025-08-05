import React, { useContext, useState } from "react";
import logo from "../../../assets/KHUSA-horiz-transparent.png";

import {
  Appearance,
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import AuthContext from "../../../context/authContext/AuthContext";
import { khusaText, surface_a50, wpUrl } from "../../../Constants";
import { StandardButton } from "../../../components/StandardButton.js";
import styles from "../../../theme/styles.js";

const WelcomeScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const { onAuthentication } = useContext(AuthContext);

  const onInputChange = (value, setState) => {
    setState(value);
  };

  const onUserAuthentication = async () => {
    setErrortext("");
    if (!email || !password) {
      setErrortext("Please enter a valid email and password");
      return;
    }

    const payload = {
      username: email,
      password: password,
    };
    try {
      const response = await fetch(wpUrl + "jwt-auth/v1/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.code === "jwt_auth_valid_credential") {
        setErrortext("");
        onAuthentication(data.data.token, data.data.id, data.data.email);
      } else if (
        data.code === "invalid_username" ||
        data.code === "invalid_email"
      ) {
        setErrortext("Please enter a valid username");
      } else if (data.code === "incorrect_password") {
        setErrortext("Incorrect password entered");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrortext(
        "An error occurred during authentication. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <KeyboardAvoidingView enabled>
          <View style={{ alignItems: "center" }}>
            <Image
              source={logo}
              style={{
                width: "50%",
                height: 100,
                resizeMode: "contain",
                margin: 30,
                tintColor:
                  Appearance.getColorScheme() === "dark" ? khusaText : null,
              }}
            />
            {errortext != "" ? (
              <Text style={styles.basicText}>{errortext}</Text>
            ) : null}
          </View>
          <TextInput
            accessible={true}
            accessibilityLabel="Email"
            style={styles.inputStyle}
            placeholder="Enter Email"
            autoCapitalize="none"
            placeholderTextColor={surface_a50}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            value={email}
            onChangeText={(value) => onInputChange(value, setEmail)}
          />
          <TextInput
            accessible={true}
            accessibilityLabel="Password"
            style={styles.inputStyle}
            placeholder="Enter Password"
            placeholderTextColor={surface_a50}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            value={password}
            onChangeText={(value) => onInputChange(value, setPassword)}
          />
          <StandardButton onPress={onUserAuthentication}>LOGIN</StandardButton>
          <View style={styles.cardText}>
            <Text
              style={styles.basicText}
              onPress={() =>
                Linking.openURL(
                  "https://login.kidshopeusa.org/?action=lostpassword"
                )
              }
            >
              Forgot Password?
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default WelcomeScreen;
