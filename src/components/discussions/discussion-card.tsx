import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { textStyles } from "../../styles/textStyles";
import { Discussion } from "../../types/dto";

interface DiscussionCardProps {
  discussion: Discussion;
  onPress?: () => void;
  style?: ViewStyle;
}
export function DiscussionCard({
  discussion,
  onPress,
  style,
}: DiscussionCardProps) {
  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity key={discussion.discussionId} onPress={onPress}>
        <Text>{discussion.announceResponder.displayName}</Text>
        <Text>Started: {discussion.createdAt}</Text>
        <Text style={[textStyles.default, { color: "red" }]}>
          {discussion.excerpt}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: DIMENSIONS.spacings.gaps.m,
    borderRadius: DIMENSIONS.borderRadius.m,
    backgroundColor: "green",
  },
});
