import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../../theme/styles.js"; // Importing styles from the styles.js file
import { PageHeading } from "../../../components/PageHeading.js";
import { colors } from "../../../Constants.js";

export function ResourcesPage({ navigation }) {
  const [sections, setSections] = useState([]);

  async function getSections() {
    try {
      const userString = await AsyncStorage.getItem("sections");
      const sectionNames = JSON.parse(userString);
      setSections(sectionNames);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  useEffect(() => {
    getSections();
  }, []);

  const Box = ({ item, index }) => {
    let destination;
    let props = null;
    let image = item.image;

    if (item.term_id !== undefined) {
      if (item.count > 0) {
        destination = "ResourceCenterViewer";
        props = { section: item.term_id };
      } else {
        destination = "ResourceSubPage";
        props = { content: item };
      }
    } else if (item.destination !== undefined) {
      destination = item.destination;
    } else {
      destination = "ResourcesPage";
    }

    return (
      <TouchableOpacity
        style={[styles.box, { backgroundColor: colors[index] }]}
        onPress={() => navigation.navigate(destination, props)}
      >
        {image && (
          <Image
            style={styles.backgroundImage}
            width="100%"
            height="100%"
            source={{ url: image }}
          />
        )}
        {!image && <Text style={styles.boxLabel}>{item.name}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <PageHeading title="Resources" />
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flexBox}>
          {sections.map((section, index) => (
            <Box index={index} item={section} key={section.name} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
