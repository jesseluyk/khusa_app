import React, { useState, useEffect, useContext } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StandardButton } from "../../../components/StandardButton.js";
import AuthContext from "../../../context/authContext/AuthContext";
import styles from "../../../theme/styles.js";
import { SectionHeading } from "../../../components/SectionHeading.js";
import { PageHeading } from "../../../components/PageHeading.js";
import { khusaRed } from "../../../Constants.js";
import * as MailComposer from "expo-mail-composer";

/**
 *
 * @param {navigation} param0
 * @returns The Profile Screen inside of Main Tab bar Navigation
 */
export function ProfilePage({ navigation }) {
  const [allUser, setAllUser] = useState([]);
  const [mentorTime, setMentorTime] = useState([]);
  const { userEmail, userSignout } = useContext(AuthContext);

  /* Grabs all of the extra user's info from AsyncStorage */
  async function getAllUser() {
    try {
      const allUserString = await AsyncStorage.getItem("allUser");
      const allUserData = JSON.parse(allUserString);
      setAllUser(allUserData.data);
      let time = allUserData.data.mentoring_time;
      time = time.split(":");
      let amPM = " AM";
      if (time[0] > 12) {
        time[0] = time[0] - 12;
        amPM = " PM";
      }
      time = time[0] + ":" + time[1] + amPM;
      setMentorTime(time);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  //calls the functions for getting the data
  useEffect(() => {
    getAllUser();
  }, []);

  /* Navigate to Auth when logging out */
  const onUserLogOut = () => {
    userSignout();
  };

  /* Navigate to Contact Support */
  async function handleContactSupport() {
    navigation.navigate("ContactSupport");
  }

  /* Send email */
  function handleEmail(email) {
    MailComposer.composeAsync({
      recipients: [email],
    });
  }

  const InfoCard = ({ title, text, onPress, buttonTitle }) => (
    <View style={styles.card}>
      <View style={[styles.cardTextGroup, { flex: 3 }]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{text}</Text>
      </View>
      {onPress && (
        <View
          style={{
            flex: 1,
          }}
        >
          <Button onPress={onPress} title={buttonTitle}></Button>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <PageHeading title={`${allUser.first} ${allUser.last}`} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false} paddingTop={10}>
          <View style={styles.section}>
            <SectionHeading title="User Information" />
            <InfoCard title="Email" text={userEmail} />
            <InfoCard title="Church" text={allUser.church} />
            <InfoCard
              title="Director"
              text={allUser.director}
              buttonTitle={"Email"}
              onPress={() => handleEmail(allUser.director_email)}
            />
            <InfoCard
              title="Prayer Partner"
              text={allUser.prayer_name}
              buttonTitle={"Email"}
              onPress={() => handleEmail(allUser.prayer_email)}
            />
          </View>
          <View style={styles.section}>
            <SectionHeading title="Student Information" />
            <InfoCard title="Student" text={allUser.student} />
            <InfoCard title="School" text={allUser.school} />
            <InfoCard
              title="Mentoring Time"
              text={
                allUser.mentoring_day
                  ? `${allUser.mentoring_day} at ${mentorTime}`
                  : ""
              }
            />
            <InfoCard
              title="Mentoring Location"
              text={allUser.mentoring_location}
            />
            <InfoCard
              title="Teacher"
              text={allUser.teacher}
              buttonTitle={"Email"}
              onPress={() => handleEmail(allUser.teacher_email)}
            />
            <InfoCard
              title="School Contact"
              text={`${allUser.school_contact}`}
            />
          </View>
          <View style={{ alignItems: "stretch" }}>
            <StandardButton onPress={handleContactSupport}>
              Contact Support
            </StandardButton>
            <StandardButton
              onPress={onUserLogOut}
              color={khusaRed}
              textColor="#ffffff"
            >
              Log Out
            </StandardButton>
          </View>
          <View padding={50} />
        </ScrollView>
      </View>
    </View>
  );
}
