import { ViewStyle } from "react-native";
import { useReportMessage } from "../../../hooks/announce/useReportMessage";
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
    if (!isReported) {
      reportMessage();
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
