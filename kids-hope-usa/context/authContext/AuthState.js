import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import {
  fetchAllUser,
  fetchKnowledgeBase,
  fetchSections,
  fetchUser,
} from "../../Fetcher";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const returnedToken = await AsyncStorage.getItem("user-token");
      const returnedId = await AsyncStorage.getItem("user-id");
      const returnedEmail = await AsyncStorage.getItem("user-email");
      setUserToken(returnedToken);
      setUserId(returnedId);
      setUserEmail(returnedEmail);

      if (returnedToken && returnedId && returnedEmail) {
        setUserToken(returnedToken);
        setUserId(returnedId);
        setUserEmail(returnedEmail);

        const allUser = await fetchUser(returnedId, returnedToken);
        if (!allUser) {
          await userSignout();
        } else {
          const sections = await fetchSections(returnedToken);
          const posts = await fetchKnowledgeBase(returnedToken);
          //await fetchInitialData(returnedToken);
        }
      }
    } catch (err) {
      await userSignout();
      console.warn("Error getting token: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const onAuthentication = async (token, id, email) => {
    setIsLoading(true);
    const user_id = id.toString();
    await AsyncStorage.setItem("user-token", token);
    await AsyncStorage.setItem("user-id", user_id);
    await AsyncStorage.setItem("user-email", email);

    const allUser = await fetchUser(user_id, token);
    const sections = await fetchSections(token);
    const posts = await fetchKnowledgeBase(token);

    setUserEmail(email);
    setUserToken(token);
    setUserId(user_id);
    setIsLoading(false);
  };

  const userSignout = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    setUserEmail(null);
    setUserId(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        onAuthentication,
        userToken,
        userId,
        userEmail,
        isLoading,
        userSignout,
        title,
        setTitle,
        pdfFile,
        setPdfFile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
