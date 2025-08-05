import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { StandardButton } from "../../../components/StandardButton.js";
import { deleteAllPdfs } from "../../../utilities/Downloader.js";
import * as FileSystem from "expo-file-system";
import { ResourceView } from "./ResourceView";
import styles from "../../../theme/styles.js";

export function Downloads(props) {
  const [savedPdfIds, setSavedPdfIds] = useState([]);
  const [currentResource, setCurrentResource] = useState(null);

  /**
   * Grabs the Ids of all of the resources saved in FileSystem storage
   */
  async function getIds() {
    try {
      setSavedPdfIds(
        await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory + "fileStorage/"
        )
      );
    } catch (e) {}
  }

  //fetches the ids
  useEffect(() => {
    getIds();
  }, []);

  /**
   *
   * @param {The item that is to be displayed} param0
   * @returns A box with the name of the item. Once pressed, opens up the item's resource
   */
  const ItemView = ({ item }) => {
    return (
      <View>
        <TouchableOpacity style={styles.card}>
          <Text
            style={styles.basicText}
            onPress={() =>
              props.navigation.navigate("ResourceViewer", {
                content: FileSystem.documentDirectory + "fileStorage/" + item,
              })
            }
          >
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   *
   * @returns either the resource displayed or the current list of IDs
   */
  function Body() {
    //Displays a certain resource if it is opened
    if (currentResource != null && currentResource != undefined) {
      return <ResourceView content={currentResource} />;
    }
    //If no resource is open, display the current list
    else {
      return (
        <View style={styles.section}>
          <FlatList
            data={savedPdfIds}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
        </View>
      );
    }
  }

  //clears the downloads
  function handleClear() {
    deleteAllPdfs();
    setSavedPdfIds([]);
  }
  /**
   * Display the body and Clear all downloads button
   */
  return (
    <View style={styles.container}>
      <Body />
      <StandardButton onPress={handleClear}>Clear all Downloads</StandardButton>
    </View>
  );
}
