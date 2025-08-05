import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, View, useWindowDimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import { khusaText, brand, surface_a0 } from "../../../Constants";
import styles from "../../../theme/styles.js";
import AuthContext from "../../../context/authContext/AuthContext.js";
import Pdf from "react-native-pdf";

export function ResourceView({ content, title }) {
  const { height, width } = useWindowDimensions();
  const tagsStyles = {
    body: {
      color: khusaText,
    },
  };
  const url = prepareContent(content);
  const { pdfFile, setPdfFile, setTitle } = useContext(AuthContext);

  // PDF FILES //
  setTitle(title);

  //Special editing must be done to the html of video and pdf files
  const [htmlFile, setHtmlFile] = useState(null);
  useEffect(() => {
    async function getCorrectFileName() {
      // Prepares content if it is a downloaded item
      if (content.substring(0, 5) === "file:") {
        return await FileSystem.readAsStringAsync(content).then((file) => {
          setHtmlFile(prepareContent(file));
        });
      } else {
        setHtmlFile(url);
      }
    }
    getCorrectFileName();
  }, []);

  function prepareContent(content) {
    if (content === undefined) {
      return null;
    }
    if (content.indexOf("<iframe") >= 0) {
      //If file has an emmbedd video
      const newStartIndex = content.indexOf("https://");
      const newEndIndex = content.indexOf("?");
      const firstUrl = content.substring(newStartIndex, newEndIndex);
      return firstUrl;
    } else if (content.indexOf("data") >= 0) {
      //If file has a pdf
      const newStartIndex = content.indexOf("https://");
      const newEndIndex = content.indexOf("type", newStartIndex);
      let url = "";
      if (newEndIndex >= 0) {
        url = content.substring(newStartIndex, newEndIndex);
        url = url.slice(0, -2);
      } else {
        //if file is html //
        url = content;
      }
      return url;
    }
    return content;
  }

  if (
    htmlFile !== null &&
    (htmlFile.indexOf(".pdf") >= 0 || htmlFile.substring(0, 2) === "ht") &&
    htmlFile.length < 300
  ) {
    if (
      htmlFile.substring(htmlFile.length - 4) === ".pdf" &&
      !(brand === "Apple")
    ) {
      //if file is a pdf and device is an Android
      setPdfFile(htmlFile); //Sets the pdf file to be used in the download bar
      return (
        <View style={{ height: "100%" }}>
          <Pdf
            source={{ uri: htmlFile }}
            trustAllCerts={false}
            style={{ flex: 1, width: "100%", height: "100%" }}
          />
        </View>
      );
    } else {
      //Not pdf or not Android
      if (htmlFile.indexOf(".pdf") >= 0) {
        setPdfFile(htmlFile); //Sets the pdf file to be used in the download bar
      } else {
        setPdfFile(null);
      }
      return (
        <View
          style={{
            paddingBottom: 50,
            height: "100%",
            backgroundColor: surface_a0,
          }}
        >
          <WebView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              height: "100%",
              backgroundColor: surface_a0,
            }}
            source={{ uri: htmlFile }}
          />
        </View>
      );
    }
  }

  if (htmlFile !== null) {
    setPdfFile(null); //Sets the pdf file to be used in the download
    try {
      return (
        //File is an Html File
        <ScrollView style={{ marginBottom: 25 }}>
          <RenderHtml
            tagsStyles={tagsStyles}
            source={{ html: htmlFile }}
            contentWidth={width}
          />
        </ScrollView>
      );
    } catch (e) {
      return (
        <View style={styles.container}>
          <Text style={styles.basicText}>Error Loading</Text>
        </View>
      );
    }
  }
  return <View />;
}
