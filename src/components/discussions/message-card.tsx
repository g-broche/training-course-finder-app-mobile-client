import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLOR_STYLES } from "../../styles/constants/colors";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { FONT_STYLES } from "../../styles/constants/fonts";
import { textStyles } from "../../styles/textStyles";
import { Message } from "../../types/dto";
import { formatDate } from "../../utils/pipe";
import { MenuMessageOtherUser } from "../shared/app-menu/menu-message-other-user";

interface MessageCardProps {
  message: Message;
  isFromUser: boolean;
  style?: ViewStyle;
}

export function MessageCard({ message, isFromUser, style }: MessageCardProps) {
  return (
    <View style={[styles.messageBubble, style]}>
      <View style={styles.header}>
        {!isFromUser && (
          <MenuMessageOtherUser
            discussionId={message.discussionId}
            messageId={message.messageId}
            isReported={message.isReported}
            style={{}}
          />
        )}

        <Text style={styles.date}>{formatDate(message.createdAt)}</Text>
      </View>
      <Text style={textStyles.inverse}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  header: {
    marginBottom: DIMENSIONS.spacings.gaps.s,
    flexDirection: "row-reverse",
  },
  date: {
    color: COLOR_STYLES.defaultTheme.colorPrimary,
    fontWeight: FONT_STYLES.weight.regular,
    fontSize: FONT_STYLES.sizes.s,
  },
});
