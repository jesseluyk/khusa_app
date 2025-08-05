import {
  TouchableOpacity,
  View,
  Text,
  Button,
  Platform,
  Modal,
} from "react-native";
import { addPdf } from "../utilities/Downloader.js";
import styles from "../theme/styles.js"; // Importing styles from the styles.js file
import { useContext, useState } from "react";
import * as Print from "expo-print";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../context/authContext/AuthContext.js";
/**
 *
 * @returns the download bar at the top of the page of a Resources and the download button that dowloads said resource
 */
export function DownloadBar({ content }) {
  const [pdfURL, setPdfURL] = useState(content);
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { pdfFile } = useContext(AuthContext);

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      uri: pdfFile,
      printerUrl: selectedPrinter?.url, // iOS only
    });
    closeModal();
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const printModal = () => {
    if (Platform.OS === "ios") {
      setIsModalVisible(true);
    } else {
      print();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPrinter(null);
  };

  //downloads content
  async function download(content) {
    await addPdf(content);
  }

  return (
    <>
      <View style={styles.downloadBar}>
        <TouchableOpacity
          style={styles.barButton}
          onPress={() => download(pdfFile)}
        >
          <Text style={styles.h2}>Download</Text>
          <MaterialIcons name="file-download" color="#ffffff" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.barButton} onPress={() => printModal()}>
          <Text style={styles.h2}>Print</Text>
          <MaterialIcons name="print" color="#ffffff" size={30} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <>
              <Text style={styles.h2}>Selected Printer</Text>
              {selectedPrinter ? (
                <Text
                  style={styles.basicText}
                >{`${selectedPrinter.name}`}</Text>
              ) : (
                <Text style={styles.basicText}>No Printer Selected</Text>
              )}
            </>

            {Platform.OS === "ios" && (
              <View style={styles.formSection}>
                {selectedPrinter ? (
                  <Button title="Print" onPress={print} />
                ) : (
                  <Button title="Select printer" onPress={selectPrinter} />
                )}
                <Button title="Close" onPress={() => closeModal()} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
