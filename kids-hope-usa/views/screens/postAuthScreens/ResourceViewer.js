import { View } from "react-native";
import { ResourceView } from "./ResourceView";
import styles from "../../../theme/styles.js"; // Importing styles from the styles.js file

export function ResourceViewer(props) {
  let postContent;
  let post_title = props.route.params.content.post_title;
  if (props.route.params.content.post_content !== undefined) {
    postContent = props.route.params.content.content;
  } else {
    postContent = props.route.params.content;
  }

  return (
    <View style={styles.pageContainer}>
      <ResourceView title={post_title} content={postContent} />
    </View>
  );
}
