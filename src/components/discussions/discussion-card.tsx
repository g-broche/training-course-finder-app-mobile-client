import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR_STYLES } from "../../styles/constants/colors";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { textStyles } from "../../styles/textStyles";
import { Discussion } from "../../types/dto";
import { formatDate } from "../../utils/pipe";

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
        <Text style={textStyles.inverse}>
          Discussion with {discussion.announceResponder.displayName}
        </Text>
        <Text style={textStyles.inverse}>
          Started: {formatDate(discussion.createdAt)}
        </Text>
        <Text style={[textStyles.inverse, styles.quote]}>
          &quot;{discussion.excerpt}&quot;
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: DIMENSIONS.spacings.gaps.m,
    borderRadius: DIMENSIONS.borderRadius.m,
    backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    overflow: "hidden",
  },
  quote: {
    fontStyle: "italic",
  },
});
