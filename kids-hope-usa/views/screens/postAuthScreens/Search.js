import React, { useState, useEffect, useContext } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResourceView } from "./ResourceView";
import TransitionScreen from "../../../components/TransitionScreen.js";
import styles from "../../../theme/styles.js";
import { PageHeading } from "../../../components/PageHeading.js";
import AuthContext from "../../../context/authContext/AuthContext.js";

export function Search() {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState("");
  const { setPdfFile } = useContext(AuthContext);

  /**
   * Grabs knowledge base data from AsyncStorage which has already been grabbed from the WordPress website
   * All of the data is then stored in masterDataSource, all title are stored in masterTitles, and the filtered titles are stored in filteredDataSource
   */
  async function getData() {
    try {
      const dataString = await AsyncStorage.getItem("data");
      const data = JSON.parse(dataString);
      setIsLoading(false);
      setMasterDataSource(data);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  /* Searches masterDataSource for text in search bar */
  const searchTextFunction = (text) => {
    if (text.length > 0) {
      searchFunction(text, masterDataSource);
    } else {
      setFilteredDataSource("");
    }
  };

  const searchFunction = (text, target, newData = []) => {
    target.forEach((record) => {
      if (record.post_title.toLowerCase().match(text.toLowerCase())) {
        newData.push(record);
      }
      setFilteredDataSource(newData);
    });
  };

  /* Creates a block of the Title of a resource to be displayed in the search menu */
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity style={styles.card} onPress={() => getItem(item)}>
        <Text style={styles.basicText}>{item.post_title}</Text>
      </TouchableOpacity>
    );
  };

  /* Displays single resource on click */
  const getItem = (item) => {
    setCurrentResource(item);
    setIsResourceOpen(true);
  };

  /* what is to be displayed in the search menu underneath the search bar and download bar */
  function Body() {
    //Displays a certain resource if it is opened
    if (isResourceOpen) {
      //Special editing must be done to the html of video and pdf files
      return (
        <View style={styles.section}>
          <ResourceView content={currentResource.content} />
        </View>
      );
    }
    //If no resource is open, display the current filtered list
    else {
      return <FilteredList />;
    }
  }

  /* the current filtered list of items to the search menu */
  function FilteredList() {
    if (isLoading) {
      return <TransitionScreen />;
    } else if (currentSearch === "") {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ width: "100%" }}>
            <View></View>
          </ScrollView>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <View style={styles.section}>
          <FlatList
            data={filteredDataSource}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <PageHeading title="Search" printButton={true} />
      <View style={styles.section}>
        <TextInput
          onPressIn={() => {
            searchTextFunction(currentSearch);
            setCurrentResource("");
            setIsResourceOpen(false);
            setPdfFile(null);
          }}
          style={styles.inputStyle}
          onChangeText={(text) => {
            searchTextFunction(text);
            setCurrentResource("");
            setIsResourceOpen(false);
            setCurrentSearch(text);
          }}
          placeholder="Search for Resources"
          keyboardType="default"
          returnKeyType="search"
          blurOnSubmit={false}
        />
      </View>

      <Body />
    </View>
  );
}
