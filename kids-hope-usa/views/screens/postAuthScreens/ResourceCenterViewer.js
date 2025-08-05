import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TransitionScreen from "../../../components/TransitionScreen.js";
import styles from "../../../theme/styles.js"; // Importing styles from the styles.js file

export function ResourceCenterViewer(props) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const section = props.route.params.section;

  async function getData() {
    try {
      const dataString = await AsyncStorage.getItem("data");
      const data = JSON.parse(dataString);
      setData(data);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchFilterFunction();
  });

  const searchFilterFunction = () => {
    // Check if searched text is not blank
    if (data.length > 0 && filteredData.length === 0 && isLoading) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        return item.section_id == section;
      });
      setIsLoading(false);

      setFilteredData(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          props.navigation.navigate("ResourceViewer", { content: item })
        }
      >
        <Text style={styles.basicText}>{item.post_title}</Text>
      </TouchableOpacity>
    );
  };

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={filteredData}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
        </View>
      </View>
    );
  }
  return <TransitionScreen />;
}
