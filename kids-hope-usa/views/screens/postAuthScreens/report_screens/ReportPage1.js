import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  khusaRed,
  khusaText,
  brand,
  khusaGreen,
  smBorder,
  smRadius,
  khusaUrl,
  surface_a50,
  surface_a30,
} from "../../../../Constants";
import styles from "../../../../theme/styles.js";
import { StandardButton } from "../../../../components/StandardButton.js";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import TransitionScreen from "../../../../components/TransitionScreen.js";
import AuthContext from "../../../../context/authContext/AuthContext.js";

export const ReportPage1 = (props) => {
  const [isChecked1_1, setChecked1_1] = useState(false);
  const [isChecked1_2, setChecked1_2] = useState(false);
  const [isChecked1_3, setChecked1_3] = useState(false);
  const [isChecked1_4, setChecked1_4] = useState(false);
  const [isChecked2_1, setChecked2_1] = useState(false);
  const [isChecked2_2, setChecked2_2] = useState(false);
  const [isChecked2_3, setChecked2_3] = useState(false);
  const [isChecked2_4, setChecked2_4] = useState(false);
  const [isChecked3_1, setChecked3_1] = useState(false);
  const [isChecked4_1, setChecked4_1] = useState(false);
  const [isChecked4_2, setChecked4_2] = useState(false);
  const [isChecked4_3, setChecked4_3] = useState(false);
  const [noMeeting, setNoMeeting] = useState(false);
  const [value1, onChangeText1] = useState();
  const [value2, onChangeText2] = useState();
  const [value4, onChangeText4] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [locationText, onChangeLocationText] = useState();
  const [allUser, setAllUser] = useState([]);
  const [isCalendar, setIsCalendar] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { userToken, userId } = useContext(AuthContext);

  //decides whether the datepicker should be showing or not
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  //detects changes for the date picker
  const onChange = ({ type }, selectedDate) => {
    setIsCalendar(false);

    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatepicker();
    }
  };

  //gets the data from allUser
  async function getAllUser() {
    try {
      const allUserString = await AsyncStorage.getItem("allUser");
      const allUser = JSON.parse(allUserString);
      setAllUser(allUser.data);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  const generateData = async () => {
    let formData = new FormData();

    //add student first name, director, school contact name, school contact email, second school contact email
    formData.append("user_id", userId);
    formData.append("absent", noMeeting);
    formData.append("locationText", locationText);
    formData.append(
      "mentorDate",
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear()
    );

    //sends the data to the backend
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
    //const json = await response.json();
    setIsSending(false);
    Alert.alert(
      "Complete",
      "Thank you for submitting your Weekly Progress Report"
    );
    return response;
  };

  async function handleClick(location) {
    setIsSending(true);
    const result = await generateData();
    props.navigation.navigate(location);
  }

  //calls the function that gets the allUser data
  useEffect(() => {
    getAllUser();
  }, []);

  if (isSending) {
    return <TransitionScreen />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text style={styles.h2}>Date:</Text>
          {brand !== "Apple" && (
            <TouchableOpacity
              style={styles.smButton}
              onPress={() => setIsCalendar(true)}
            >
              <Text style={styles.h2}>{date.toDateString()}</Text>
            </TouchableOpacity>
          )}
          {(brand === "Apple" || (brand !== "Apple" && isCalendar)) && (
            <DateTimePicker mode="date" value={date} onChange={onChange} />
          )}
        </View>
        <View style={styles.formSection}>
          <Text style={styles.h2}>Location:</Text>
          <View style={{ flex: 2 }}>
            <TextInput
              inputMode={"text"}
              defaultValue={allUser.mentoring_location}
              editable
              onChangeText={(text) => onChangeLocationText(text)}
              locationText={locationText}
              style={styles.inputStyle}
              placeholderTextColor={khusaText}
              returnKeyType="next"
            />
          </View>
        </View>
        <View style={styles.formSection}>
          <TouchableOpacity
            style={[
              styles.response,
              {
                borderWidth: 1,
                borderRadius: smRadius,
                borderColor: khusaGreen,
                backgroundColor: surface_a30,
              },
            ]}
            onPress={() => {
              setNoMeeting(!noMeeting);
            }}
          >
            <Checkbox
              style={styles.checkbox}
              value={noMeeting}
              onValueChange={setNoMeeting}
              color={noMeeting ? khusaRed : undefined}
            />
            <Text style={[styles.basicText, { maxWidth: 300 }]}>
              Student was absent. Mentoring did not take place.
            </Text>
          </TouchableOpacity>
        </View>
        {!noMeeting && (
          <View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.h2}>How did you spend your time?</Text>
              <Text style={styles.subText}>(Check all that apply)</Text>
            </View>

            {/* RELATIONSHIPI BUILDING ACTIVITIES */}
            <View style={styles.inputSection} id="relationship">
              <Text style={styles.h2}>Relationship Building Activities</Text>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked1_1(!isChecked1_1);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked1_1}
                  onValueChange={setChecked1_1}
                  color={isChecked1_1 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>All About Me Book</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked1_2(!isChecked1_2);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked1_2}
                  onValueChange={setChecked1_2}
                  color={isChecked1_2 ? khusaRed : undefined}
                />

                <Text style={styles.basicText}>General Conversation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked1_3(!isChecked1_3);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked1_3}
                  onValueChange={setChecked1_3}
                  color={isChecked1_3 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>Catch Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked1_4(!isChecked1_4);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked1_4}
                  onValueChange={setChecked1_4}
                  color={isChecked1_4 ? khusaRed : undefined}
                />

                <Text style={styles.basicText}>Other</Text>
              </TouchableOpacity>
              {isChecked1_4 && (
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder={"Other Relationship"}
                    editable
                    onChangeText={(text) => onChangeText1(text)}
                    value1={value1}
                    style={styles.inputStyle}
                    returnKeyType="next"
                  ></TextInput>
                </View>
              )}
            </View>
            {/* ACADEMIC ACTIVITIES */}
            <View style={styles.inputSection} id="academic">
              <Text style={styles.h2}>Academic Activities</Text>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked2_1(!isChecked2_1);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked2_1}
                  onValueChange={setChecked2_1}
                  color={isChecked2_1 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>Reading</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked2_2(!isChecked2_2);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked2_2}
                  onValueChange={setChecked2_2}
                  color={isChecked2_2 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>Spelling </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked2_3(!isChecked2_3);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked2_3}
                  onValueChange={setChecked2_3}
                  color={isChecked2_3 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>Math</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked2_4(!isChecked2_4);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked2_4}
                  onValueChange={setChecked2_4}
                  color={isChecked2_4 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>Other</Text>
              </TouchableOpacity>
              {isChecked2_4 && (
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder={"Other Academic"}
                    editable
                    onChangeText={(text) => onChangeText2(text)}
                    value1={value2}
                    style={styles.inputStyle}
                    returnKeyType="next"
                  ></TextInput>
                </View>
              )}
            </View>
            {/* LIFE SKILLS CHARACTER */}
            <View style={styles.inputSection} id="lifeSkills">
              <Text style={styles.h2}>Life Skills & Character</Text>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked3_1(!isChecked3_1);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked3_1}
                  onValueChange={setChecked3_1}
                  color={isChecked3_1 ? khusaRed : undefined}
                />

                <Text style={styles.basicText}>Life Skills and Character</Text>
              </TouchableOpacity>
            </View>
            {/* PLAY */}
            <View style={styles.inputSection} id="play">
              <Text style={styles.h2}>Play</Text>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked4_1(!isChecked4_1);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked4_1}
                  onValueChange={setChecked4_1}
                  color={isChecked4_1 ? khusaRed : undefined}
                />

                <Text style={styles.basicText}>Games</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked4_2(!isChecked4_2);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked4_2}
                  onValueChange={setChecked4_2}
                  color={isChecked4_2 ? khusaRed : undefined}
                />
                <Text style={styles.basicText}>Art</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.response}
                onPress={() => {
                  setChecked4_3(!isChecked4_3);
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked4_3}
                  onValueChange={setChecked4_3}
                  color={isChecked4_3 ? khusaRed : undefined}
                />

                <Text style={styles.basicText}>Other</Text>
              </TouchableOpacity>
              {isChecked4_3 && (
                <View style={{ width: "100%" }}>
                  <TextInput
                    editable
                    placeholder={"Other Play"}
                    onChangeText={(text) => onChangeText4(text)}
                    value4={value4}
                    style={styles.inputStyle}
                    returnKeyType="next"
                  ></TextInput>
                </View>
              )}
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      {noMeeting && (
        <StandardButton onPress={() => handleClick("Main")}>
          Submit Report
        </StandardButton>
      )}
      {!noMeeting && (
        <StandardButton
          onPress={() => {
            if (locationText == "") {
              alert("Please enter a mentoring location");
            } else {
              props.navigation.navigate("ReportPage2", {
                date:
                  date.getMonth() +
                  1 +
                  "-" +
                  date.getDate() +
                  "-" +
                  date.getFullYear(),
                location: locationText,
                aboutMeBook: isChecked1_1,
                generalConvo: isChecked1_2,
                catchUp: isChecked1_3,
                otherRelationship: isChecked1_4,
                relationshipOther: value1,
                read: isChecked2_1,
                spelling: isChecked2_2,
                math: isChecked2_3,
                otherAcademic: isChecked2_4,
                academicOther: value2,
                lifeSkills: isChecked3_1,
                games: isChecked4_1,
                art: isChecked4_2,
                otherPlay: isChecked4_3,
                playOther: value4,
              }),
                console.log(date);
            }
          }}
        >
          Next
        </StandardButton>
      )}
      <View style={{ paddingBottom: 20 }}></View>
    </View>
  );
};

export default ReportPage1;
