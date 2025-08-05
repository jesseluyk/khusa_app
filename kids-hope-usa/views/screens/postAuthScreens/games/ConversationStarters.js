import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import { fetchPrompts } from "../../../../Fetcher";
import AuthContext from "../../../../context/authContext/AuthContext";
import styles from "../../../../theme/styles.js";
import { PageHeading } from "../../../../components/PageHeading";
import TransitionScreen from "../../../../components/TransitionScreen.js";

export function ConversationStarters() {
  const [prompt, setPrompt] = useState(
    "Tap the screen to generate a question!"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [prompts, setPrompts] = useState(null);
  const { userToken } = useContext(AuthContext);

  const loadPrompts = async () => {
    const data = await fetchPrompts(userToken, "get_to_know");
    setIsLoading(false);
    return data;
  };
  //Get Questions based on Category
  useEffect(() => {
    if (userToken !== undefined) {
      setPrompts(loadPrompts());
    }
  }, [userToken]);

  //randomly generates a number that corresponds with an index in the promptArray
  function generate() {
    if (prompts !== undefined && prompts._j !== null && prompts._j.length > 0) {
      const actualPrompts = prompts._j;
      let random = Math.floor(Math.random() * actualPrompts.length);
      let thisPrompt = actualPrompts[random];
      if (actualPrompts.length > 1) {
        while (thisPrompt.prompt === prompt) {
          random = Math.floor(Math.random() * actualPrompts.length);
          thisPrompt = actualPrompts[random];
        }
      }
      return thisPrompt.prompt;
    }
    return "Loading... Press again in a couple seconds";
  }

  //generates a new prompt
  function handleClick() {
    setPrompt(generate());
  }

  return (
    <View style={styles.container}>
      <PageHeading title="Conversation Starters" />
      {isLoading && <TransitionScreen />}
      {!isLoading && (
        <View style={styles.promptArea}>
          <Text
            onPress={() => {
              handleClick();
            }}
            style={styles.promptText}
          >
            {prompt}
          </Text>
          <Text style={styles.basicText}>Tap Screen for a New Question</Text>
          <View style={{ paddingBottom: 20 }}></View>
        </View>
      )}
    </View>
  );
}
