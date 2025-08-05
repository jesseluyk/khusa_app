import React, { useState } from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { khusaText } from "../../../../Constants";
import styles from "../../../../theme/styles.js";
import { StandardButton } from "../../../../components/StandardButton.js";
import { MaterialIcons } from "@expo/vector-icons";

export const ReportPage2 = (props) => {
  const options = [
    "1 - Needs Improvement",
    "2 - Not Very Well",
    "3 - Responded Well",
    "4 - Very Well",
    "5 - Outstanding",
  ];
  const [selectedOption1, setSelectedOption1] = useState();
  const [selectedOption2, setSelectedOption2] = useState();
  const [selectedOption3, setSelectedOption3] = useState();

  const currentDate = props.route.params.date;
  const locationText = props.route.params.location;
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

  //makes sure all required fields are filled out before you navigate to the next page
  function handleClick(location) {
    props.navigation.navigate(location, {
      currentDate: currentDate,
      locationText: locationText,
      aboutMeBook: aboutMeBook,
      generalConvo: generalConvo,
      catchUp: catchUp,
      otherRelationship: otherRelationship,
      relationshipOther: relationshipOther,
      read: read,
      spelling: spelling,
      math: math,
      otherAcademic: otherAcademic,
      academicOther: academicOther,
      lifeSkills: lifeSkills,
      games: games,
      art: art,
      otherPlay: otherPlay,
      playOther: playOther,
      attitude: selectedOption1,
      cooperation: selectedOption2,
      onTask: selectedOption3,
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={styles.basicText}>How did your student respond?</Text>
        <Text style={styles.subText}>
          Scale of 1 (needs improvement) to 5 (outstanding).
        </Text>
      </View>
      <View style={styles.flexGroup}>
        <View style={styles.dropDownContainer}>
          <Text style={styles.h2}>Attitude</Text>
          <SelectDropdown
            buttonStyle={styles.dropBox}
            buttonTextStyle={styles.basicText}
            defaultButtonText="Select an option"
            data={options}
            onSelect={(selectedItem) => {
              setSelectedOption1(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <MaterialIcons
                  name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
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
        <View style={styles.dropDownContainer}>
          <Text style={styles.h2}>Cooperation</Text>
          <SelectDropdown
            buttonStyle={styles.dropBox}
            buttonTextStyle={styles.basicText}
            defaultButtonText="Select an option"
            data={options}
            onSelect={(selectedItem) => {
              setSelectedOption2(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <MaterialIcons
                  name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
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
        <View style={styles.dropDownContainer}>
          <Text style={styles.h2}>On task</Text>
          <SelectDropdown
            buttonStyle={styles.dropBox}
            buttonTextStyle={styles.basicText}
            defaultButtonText="Select an option"
            data={options}
            onSelect={(selectedItem) => {
              setSelectedOption3(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <MaterialIcons
                  name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
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
      </View>

      <StandardButton onPress={() => handleClick("ReportPage3")}>
        Next
      </StandardButton>
    </View>
  );
};

export default ReportPage2;
