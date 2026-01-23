import { Text } from "react-native";
import { textStyles } from "../../styles/textStyles";

export default function GuestDiscussionInterface() {
  return (
    <Text style={textStyles.default}>
      You need to be logged in for the discussion feature
    </Text>
  );
}
