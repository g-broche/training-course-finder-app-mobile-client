import { Alert, ViewStyle } from "react-native";
import { useReportMessage } from "../../../hooks/discussion/useReportMessage";
import Menu from "./menu";
import MenuItem from "./menu-item";

interface MenuMessageOtherUserProps {
  discussionId: string;
  messageId: string;
  isReported?: boolean;
  style: ViewStyle;
}

export function MenuMessageOtherUser({
  discussionId,
  messageId,
  isReported,
  style,
}: MenuMessageOtherUserProps) {
  const { mutate: reportMessage, isPending } = useReportMessage({
    discussionId,
    messageId,
  });

  const handlePress = () => {
    if (!isReported && !isPending) {
      reportMessage(undefined, {
        onSuccess: () => {
          Alert.alert("Success", "Message reported successfully.");
        },
      });
    }
  };

  return (
    <Menu style={style}>
      <MenuItem
        label={isReported ? "Already reported" : "Report"}
        iconSource="warning-outline"
        onPress={handlePress}
      />
    </Menu>
  );
}
