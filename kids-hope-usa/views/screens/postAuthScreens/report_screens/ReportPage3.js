import React, { useState, useContext } from "react";
import { Text, View, TextInput, Alert } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { khusaText, khusaUrl } from "../../../../Constants";
import styles from "../../../../theme/styles.js";
import { StandardButton } from "../../../../components/StandardButton.js";
import AuthContext from "../../../../context/authContext/AuthContext";
import TransitionScreen from "../../../../components/TransitionScreen.js";
import { MaterialIcons } from "@expo/vector-icons";

export const ReportPage3 = (props) => {
  const options = [
    "1 - Discouraged",
    "2 - Slightly Discouraged",
    "3 - Neutral",
    "4 - Slightly Encouraged",
    "5 - Encouraged",
  ];
  const [isSending, setIsSending] = useState(false);
  const [sessionFeel, setSessionFeel] = useState();
  const [memorable, memorableChange] = useState();
  const [comments, commentsChange] = useState();
  const [user, setUser] = useState([]);
  const locationText = props.route.params.locationText;
  const mentorDate = props.route.params.currentDate;
  const aboutMeBook = props.route.params.aboutMeBook;
  const generalConvo = props.route.params.generalConvo;
  const catchUp = props.route.params.catchUp;
  const otherRelationship = props.route.params.otherRelationship;
  const relationshipOther = props.route.params.relationshipOther;
  const read = props.route.params.read;
  const spelling = props.route.params.spelling;
  const math = props.route.params.math;
  const otherAcademic = props.route.params.otherAcademic;
  const academicOther = props.route.params.academicOther;
  const lifeSkills = props.route.params.lifeSkills;
  const games = props.route.params.games;
  const art = props.route.params.art;
  const otherPlay = props.route.params.otherPlay;
  const playOther = props.route.params.playOther;
  const attitude = props.route.params.attitude;
  const cooperation = props.route.params.cooperation;
  const onTask = props.route.params.onTask;
  const { userToken, userId } = useContext(AuthContext);

  //
  let generateData = async () => {
    let formData = new FormData();

    //add student first name, director, school contact name, school contact email, second school contact email
    formData.append("user_id", userId);
    formData.append("locationText", locationText);
    formData.append("mentorDate", mentorDate);
    formData.append("aboutMe", aboutMeBook);
    formData.append("generalConvo", generalConvo);
    formData.append("catchUp", catchUp);
    formData.append("otherRelationship", otherRelationship);
    formData.append("relationshipOther", relationshipOther);
    formData.append("read", read);
    formData.append("spelling", spelling);
    formData.append("math", math);
    formData.append("otherAcademic", otherAcademic);
    formData.append("academicOther", academicOther);
    formData.append("lifeSkills", lifeSkills);
    formData.append("games", games);
    formData.append("art", art);
    formData.append("otherPlay", otherPlay);
    formData.append("playOther", playOther);
    formData.append("attitude", attitude);
    formData.append("cooperation", cooperation);
    formData.append("onTask", onTask);
    formData.append("sessionFeel", sessionFeel);
    formData.append("memorable", memorable);
    formData.append("comments", comments);

    const response = await fetch(khusaUrl + "progress_report", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
      body: formData,
    });
    if (!response.ok) {
      console.log("ERROR");
      alert("Something has gone wrong. Please try again later.");
      // oups! something went wrong
      setIsSending(false);
      return;
    }
    const json = await response.json();

    setIsSending(false);
    Alert.alert(
      "Complete",
      "Thank you for submitting your Weekly Progress Report"
    );
    return json;
  };

  async function handleClick(location) {
    if (sessionFeel == undefined) {
      alert("Please make sure all fields marked as mandatory are filled out");
    } else {
      setIsSending(true);
      const result = await generateData();
      props.navigation.navigate(location);
    }
  }

  if (isSending) {
    return <TransitionScreen />;
  }

  return (
    <View style={styles.container}>
      {!isSending && (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.basicText}>
              How did you feel after this session?
            </Text>
            <SelectDropdown
              buttonStyle={styles.dropBox}
              buttonTextStyle={styles.h2}
              defaultButtonText="Select an option"
              data={options}
              onSelect={(selectedItem) => {
                setSessionFeel(selectedItem);
              }}
              buttonTextAfterSelection={(sessionFeel, index) => {
                //setSessionFeel(sessionFeel);
                return sessionFeel;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <MaterialIcons
                    name={
                      isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"
                    }
                    size={24}
                    color={khusaText}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.basicText}
            />
          </View>

          <Text style={styles.basicText}>Anything memorable happen today?</Text>
          <TextInput
            placeholder={"(e.g. quote, joy, humor, new behavior)"}
            editable
            multiline
            numberOfLines={16}
            onChangeText={(text) => memorableChange(text)}
            memorable={memorable}
            style={styles.inputMed}
          />
          <Text style={styles.basicText}>Any comments:</Text>
          <TextInput
            editable
            multiline
            numberOfLines={16}
            onChangeText={(text) => commentsChange(text)}
            comments={comments}
            style={styles.inputMed}
          />
        </KeyboardAwareScrollView>
      )}
      <StandardButton onPress={() => handleClick("Main")}>
        Submit Report
      </StandardButton>
      <View style={{ paddingBottom: 20 }}></View>
    </View>
  );
};

export default ReportPage3;
