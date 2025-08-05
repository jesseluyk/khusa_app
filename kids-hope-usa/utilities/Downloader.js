import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const directory = FileSystem.documentDirectory + "fileStorage/";
const loginDirectory = FileSystem.documentDirectory + "login/";

function FileUri(url) {
  return directory + "FILE";
}

// Checks if pdf directory exists. If not, creates it
async function ensureDirExists(directory) {
  const dirInfo = await FileSystem.getInfoAsync(directory);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  }
}

// Downloads one pdf specified as an ID
export async function addPdf(url) {
  try {
    ensureDirExists(directory)
      .then(await FileSystem.writeAsStringAsync(FileUri(url), url))
      .then(Alert.alert("Success", "Resource successfuly downloaded"));
  } catch (e) {
    console.error("Couldn't download pdf file:", e);
    //addPdf(url);
  }
}

// Downloads all pdfs specified as array of IDs
export async function addMultiplePdfs(urls) {
  try {
    await ensureDirExists(directory).then(
      await Promise.all(
        urls.map((url) => FileSystem.downloadAsync(url, FileUri(url)))
      )
    );
  } catch (e) {
    console.error("Couldn't download pdf files:", e);
  }
}

// Returns URI to our local pdf file
// If our pdf doesn't exist locally, it downloads it
export async function getSinglePdf(url) {
  await ensureDirExists(directory);

  const fileUri = FileUri(url);

  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    //await FileSystem.downloadAsync(url, fileUri);
  }
  return fileUri;
}

// Exports shareable URI - it can be shared outside your app
export async function getPdfContentUri(url) {
  return FileSystem.getContentUriAsync(await getSinglePdf(url));
}

// Deletes whole pdf directory with all its content
export async function deleteAllPdfs() {
  try {
    await FileSystem.deleteAsync(directory);
  } catch (e) {}
}

export async function addLoginCredentials(username, password) {
  try {
    ensureDirExists(loginDirectory).then(
      await FileSystem.writeAsStringAsync(
        loginDirectory + "credentials/",
        username + ":" + password
      )
    );
    console.log("Done!");
  } catch (e) {
    console.log("Adding Login Error: " + e);
    addLoginCredentials(username, password);
  }
}

export async function removeLogin() {
  try {
    await FileSystem.deleteAsync(loginDirectory);
  } catch (e) {}
}
