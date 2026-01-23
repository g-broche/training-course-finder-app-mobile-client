import { StyleSheet, Text, View, ViewStyle } from "react-native";
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
      <Text style={textStyles.inverse}>{formatDate(message.createdAt)}</Text>
      <Text style={textStyles.inverse}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
});
