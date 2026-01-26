import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLOR_STYLES } from "../../styles/constants/colors";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { FONT_STYLES } from "../../styles/constants/fonts";
import { textStyles } from "../../styles/textStyles";
import { Message } from "../../types/dto";
import { formatDate } from "../../utils/pipe";

interface MessageCardProps {
  message: Message;
  isFromUser: boolean;
  style?: ViewStyle;
}

export function MessageCard({ message, isFromUser, style }: MessageCardProps) {
  return (
    <View style={[styles.messageBubble, style]}>
      <Text style={styles.date}>{formatDate(message.createdAt)}</Text>
      <Text style={textStyles.inverse}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  date: {
    color: COLOR_STYLES.defaultTheme.colorPrimary,
    fontWeight: FONT_STYLES.weight.regular,
    fontSize: FONT_STYLES.sizes.s,
    textAlign: "right",
    marginBottom: DIMENSIONS.spacings.gaps.s,
  },
});
