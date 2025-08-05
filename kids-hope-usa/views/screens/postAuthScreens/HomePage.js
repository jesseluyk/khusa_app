import React, { useState, useEffect } from "react";
import {
  Linking,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import styles from "../../../theme/styles.js"; // Importing styles from the styles.js file
import MaterialIcons from "@expo/vector-icons/MaterialIcons.js";
import Announcement from "../../../components/Announcement.js";
import { PageHeading } from "../../../components/PageHeading.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  khusaBlue,
  khusaDarkRed,
  khusaGreen,
  khusaRed,
} from "../../../Constants.js";

export function HomePage({ navigation }) {
  const [allUser, setAllUser] = useState([]);
  const [announcement, setAnnouncement] = useState({
    text: "Welcome to the Kids Hope USA Mentor App!",
    icon: "campaign",
  });

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

  //The names and destinations of the Boxes in the Mentoring Section //
  const mentorBoxes = [
    {
      id: 1,
      name: "Resource Center",
      destination: "Resources",
      icon: "book",
      color: khusaGreen,
    },
    {
      id: 2,
      name: "Games & Activities",
      destination: "GameNav",
      icon: "casino",
      color: khusaDarkRed,
    },
    {
      id: 3,
      name: "Progress Report",
      destination: "Report",
      icon: "assignment",
    },
    {
      id: 4,
      name: "Support",
      destination: "Support",
      icon: "support-agent",
      color: khusaBlue,
    },
  ];

  // A Box with the item's title. OnPress -> Goes to the item's resource //
  const Box = ({ item }) => {
    let destination;
    let props = null;
    let name = item.name;
    let isNavigation = true;
    let icon = item.icon;

    if (item.title !== undefined) {
      //If item is training
      name = item.title.rendered;
      isNavigation = false;
    }
    if (item.term_id !== undefined) {
      //If item is in ResourceCenter
      destination = "ResourceCenterViewer";
      props = { section: item.term_id };
    } else if (item.destination !== undefined) {
      //If item is in Tools
      destination = item.destination;
    } else {
      //Failsafe if nothing works
      destination = "Main";
    }

    return (
      <TouchableOpacity
        style={[
          styles.box,
          {
            //  backgroundColor: item.color !== undefined ? item.color : khusaRed,
          },
        ]} //If item has a color, use it, else use red
        s
        onPress={() =>
          isNavigation
            ? navigation.navigate(destination, props)
            : Linking.openURL(item.link, {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + user.token,
                },
              })
        }
      >
        <Text style={styles.boxLabel}>{name}</Text>
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

  // Displays the HomePage with its Welcome bar, sections, and their Box children //
  return (
    <View style={styles.container}>
      <PageHeading title={`${allUser.first} ${allUser.last}`} />
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {announcement && (
          <Announcement text={announcement.text} icon={announcement.icon} />
        )}
        <View style={styles.flexBox}>
          {mentorBoxes.map((item) => (
            <Box key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
