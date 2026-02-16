import { useEffect } from "react";
import { Text, View, ViewStyle } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useDiscussion } from "../../hooks/discussion/useDiscussions";
import { COLOR_STYLES } from "../../styles/constants/colors";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { textStyles } from "../../styles/textStyles";
import { formatDate } from "../../utils/pipe";
import MessageForm from "../forms/message-form";
import { ErrorState } from "../shared/error-state";
import { LoaderState } from "../shared/loader-state";
import { MessageCard } from "./message-card";

interface DiscussionViewProps {
  discussionId: string;
  announceAuthorDisplayName: string;
}

export function DiscussionView({
  discussionId,
  announceAuthorDisplayName,
}: DiscussionViewProps) {
  const { authState } = useAuth();
  const {
    data: detailedDiscussion,
    isLoading,
    isError,
  } = useDiscussion({ announceId: discussionId });
  const isMessageFromUser = (authorDisplayName: string) => {
    return authState?.user?.displayName === authorDisplayName;
  };
  const isAnnounceFromUser =
    authState?.user?.displayName === announceAuthorDisplayName;
  const messageStyle = (isFromUser: boolean): ViewStyle => {
    return {
      backgroundColor: isFromUser
        ? COLOR_STYLES.defaultTheme.colorInteractiveActive
        : COLOR_STYLES.defaultTheme.colorInteractiveInactive,
      alignSelf: isFromUser ? "flex-end" : "flex-start",
      width: "80%",
    };
  };

  useEffect(() => {
    console.log("Detailed discussion data:", detailedDiscussion);
  }, [detailedDiscussion]);

  if (isLoading) {
    return <LoaderState />;
  }
  if (isError) {
    return <ErrorState />;
  }
  if (!isLoading && !!detailedDiscussion) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={textStyles.default}>
            Discussion with{" "}
            {isAnnounceFromUser
              ? detailedDiscussion.announceResponder.displayName
              : detailedDiscussion.announceAuthor.displayName}
          </Text>
          <Text style={textStyles.default}>
            Started: {formatDate(detailedDiscussion.createdAt)}
          </Text>
        </View>
        <View style={styles.messageContainer}>
          {detailedDiscussion.messages.map((message) => (
            <MessageCard
              key={message.index}
              message={message}
              isFromUser={isMessageFromUser(message.author.displayName)}
              style={messageStyle(
                isMessageFromUser(message.author.displayName),
              )}
            />
          ))}
        </View>
        <MessageForm
          announceId={detailedDiscussion.announceId}
          discussionId={detailedDiscussion.discussionId}
          isDiscussionStarter={false}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    padding: DIMENSIONS.spacings.gaps.s,
    gap: DIMENSIONS.spacings.gaps.l,
  },
  header: {
    gap: DIMENSIONS.spacings.gaps.m,
  },
  messageContainer: {
    gap: DIMENSIONS.spacings.gaps.m,
  },
};
