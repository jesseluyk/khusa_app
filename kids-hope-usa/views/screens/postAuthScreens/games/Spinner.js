import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Dimensions,
  Easing,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import PieChart from "react-native-pie-chart";
import styles from "../../../../theme/styles.js";
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";

export function Spinner() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [randomNumberArray, setRandomNumberArray] = useState([0, 0]);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const widthAndHeight = Dimensions.get("window").width * 0.6;
  const columns = Dimensions.get("window").width / 600;
  const availableColors = [
    "#e75c55",
    "#FFBA00",
    "#8CC747",
    "#3FA5F5",
    "#FFC0CC",
    "#B4E6E6",
    "#F3C76D",
    "#E26126",
    "#B4E6B4",
    "#42BFEC",
  ];
  const [sliceNames, setSliceNames] = useState(["A", "B", "C", "D", "E"]);
  const sliceColor = availableColors.slice(
    0,
    sliceNames.length < 10 ? sliceNames.length : 10
  );
  const potentialSeries = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  const series = potentialSeries.slice(
    0,
    sliceNames.length < 10 ? sliceNames.length : 10
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const minNumSpins = 6;

  useEffect(() => {
    reset();
  }, []);

  //handles popup that says which segment has been selected
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  //resets the spinner
  const reset = () => {
    rotateAnimation.resetAnimation();
    const random = Math.floor(Math.random() * 360) + minNumSpins * 360;
    setRandomNumber(random);
    setRandomNumberArray((previous) => [...previous, random]);
  };

  //handles wheel animation
  const handleAnimation = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      reset();
      setIsDeleteOpen(false);
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 4000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(({}) => {
        setIsSpinning(false);
      });
    }
  };

  //sets the range for spinning
  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      "0deg",
      randomNumberArray[randomNumberArray.length - 2] + "deg",
    ],
  });

  //gets which segment is picked
  function getWinner() {
    let fraction = (randomNumber - 360 * minNumSpins) / 360;
    fraction *= -1 * sliceNames.length;
    fraction += sliceNames.length;
    const newWinner = sliceNames[Math.floor(fraction)];
    setWinner(newWinner);
    return newWinner;
  }

  //adds a segment to the wheel
  function addItem(item) {
    setSliceNames((previous) => [...previous, item]);
    reset();
    handleModal();
    setCurrentInput("");
  }

  //removes a segment from the wheel
  function deleteItem({ item }) {
    if (sliceNames.length > 1) {
      const index = sliceNames.indexOf(item);
      const tempNames = sliceNames;
      tempNames.splice(index, 1);
      setSliceNames(tempNames);
      reset();
    }
  }

  //sets the display for deleting a segment
  function DeleteButton({ item }) {
    if (isDeleteOpen) {
      return (
        <TouchableOpacity
          style={styles.smButton}
          onPress={() => deleteItem({ item })}
        >
          <Text style={styles.basicText}>X</Text>
        </TouchableOpacity>
      );
    }
  }

  //sets visuals for the segments
  function ItemView({ item }) {
    const index = sliceNames.indexOf(item);
    const color = sliceColor[index];
    if (randomNumber)
      return (
        <View style={[styles.pieOptions, { backgroundColor: color }]}>
          <Text style={styles.pieOptionStyle}>{item}</Text>
          <DeleteButton item={item} />
        </View>
      );
  }

  try {
    return (
      <View style={styles.container}>
        <View style={styles.pieGroup}>
          <View>
            <Text style={styles.basicText}>Tap the wheel to spin!</Text>
          </View>
          <View style={styles.triangle}></View>
          <Pressable onPress={() => handleAnimation()}>
            <Animated.View
              style={[
                {
                  transform: [{ rotate: interpolateRotating }],
                  alignSelf: "center",
                },
              ]}
            >
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
              />
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.buttonGroup}>
          <Text style={styles.h2}>Options</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleModal();
            }}
          >
            <Text style={styles.h2}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsDeleteOpen(!isDeleteOpen);
            }}
          >
            <Text style={styles.h2}>{isDeleteOpen ? "Save" : "-"}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.optionsGroup}>
          <FlatList
            data={sliceNames}
            scrollEnabled={false}
            extraData={this.state}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
        </ScrollView>
        <KeyboardAvoidingView enabled>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setIsModalVisible(!isModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.h2}>Enter a New Option</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(input) => setCurrentInput(input)}
                  value={currentInput}
                  placeholder="Enter new option"
                  placeholderTextColor="#8b9cb5"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      handleModal();
                    }}
                  >
                    <Text style={[styles.basicText]}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      addItem(currentInput);
                    }}
                  >
                    <Text style={[styles.basicText]}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </View>
    );
  } catch (e) {}
}
