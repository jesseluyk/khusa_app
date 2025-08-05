import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../../theme/styles";
import { PageHeading } from "../../../components/PageHeading";
import { colors } from "../../../Constants";
import { fetchSubSections } from "../../../Fetcher";
import TransitionScreen from "../../../components/TransitionScreen";
import AuthContext from "../../../context/authContext/AuthContext";

function ResourceSubPage(props) {
  const { userToken } = useContext(AuthContext);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSections = async () => {
    const section = props.route.params.content.term_id;
    const data = await fetchSubSections(userToken, section);
    setSections(data);
    setIsLoading(false);
  };

  console.log(props);
  const navigation = props.navigation;
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

  useEffect(() => {
    getSections();
  }, []);

  return (
    <View style={styles.container}>
      <PageHeading title={props.route.params.content.name} />
      {isLoading && <TransitionScreen />}
      <View style={styles.flexBox}>
        {sections.map((section, index) => (
          <Box index={index} item={section} key={section.name} />
        ))}
      </View>
    </View>
  );
}

export default ResourceSubPage;
