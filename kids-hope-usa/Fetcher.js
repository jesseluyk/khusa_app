import AsyncStorage from "@react-native-async-storage/async-storage";
import { khusaUrl } from "./Constants";

// Utility function to store data in AsyncStorage
async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error storing ${key}:`, error.message);
  }
}

// Generic fetch function
async function fetchData(url, method, token, body = null) {
  const headers = {
    Authorization: "Bearer " + token,
    ...(body && { "Content-Type": "multipart/form-data" }),
  };

  try {
    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error; // Re-throw error for higher-level handling
  }
}

// Grab all user data
export async function fetchUser(id, token) {
  const userFormData = new FormData();
  userFormData.append("user_id", id);
  /*
  const allUser = await fetchData(
    khusaUrl + "user-info",
    "POST",
    token,
    userFormData
  );
  */
  const allUser = await fetchData(khusaUrl + "user/" + id, "GET", token);
  await storeData("allUser", allUser);
  return allUser;
}

export async function fetchKnowledgeBase(token) {
  const data = await fetchData(
    khusaUrl + "posts/type/knowledgebase",
    "GET",
    token
  );
  await storeData("data", data);
  return data;
}

export async function fetchSections(token) {
  const sections = await fetchData(
    khusaUrl + "posts/mentor-resource-structure",
    "GET",
    token
  );
  await storeData("sections", sections);
  return sections;
}

export async function fetchSubSections(token, section) {
  console.log(section);

  const data = await fetchData(
    khusaUrl + "posts/knowledge-base-structure/" + section,
    "GET",
    token
  );
  console.log("Data" + data);
  return data;
}

export async function fetchPrompts(token, type) {
  return await fetchData(khusaUrl + "prompts/" + type, "GET", token);
}
