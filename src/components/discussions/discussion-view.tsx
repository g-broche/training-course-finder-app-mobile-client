import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useDiscussion } from "../../hooks/discussion/useDiscussion";
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
  isAnnounceInteractivityOpen?: boolean;
}

export function DiscussionView({
  discussionId,
  announceAuthorDisplayName,
  isAnnounceInteractivityOpen = false,
}: DiscussionViewProps) {
  // Getting authentification state from AuthContext
  const { authState } = useAuth();
  // Getting detailed discussion data using the discussionId
  const {
    data: detailedDiscussion,
    isLoading,
    isError,
  } = useDiscussion({ discussionId: discussionId });
  // Function to check if a given message is from the current user
  const isMessageFromUser = (authorDisplayName: string) => {
    return authState?.user?.displayName === authorDisplayName;
  };
  // Check if the announce is from the current user
  const isAnnounceFromUser =
    authState?.user?.displayName === announceAuthorDisplayName;

  // Checks if the discussion is open for interaction
  const doesAllowReply =
    isAnnounceInteractivityOpen &&
    detailedDiscussion?.interactivityStateName === "open";

  if (isLoading) {
    return <LoaderState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  // Main render of the discussion view, showing messages and a form to reply if allowed
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
          {/* Displaying messages of the discussion, styling them differently if they are from the user or not */}
          {detailedDiscussion.messages.map((message) => (
            <MessageCard
              key={message.index}
              message={message}
              isFromUser={isMessageFromUser(message.author.displayName)}
              style={
                isMessageFromUser(message.author.displayName)
                  ? styles.messageFromUser
                  : styles.messageFromOther
              }
            />
          ))}
        </View>
        {/* Displaying the message form if the discussion allows replies, otherwise showing a closed message */}
        {doesAllowReply ? (
          <MessageForm
            announceId={detailedDiscussion.announceId}
            discussionId={detailedDiscussion.discussionId}
            isDiscussionStarter={false}
          />
        ) : (
          <Text style={textStyles.default}>This announce is closed</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  messageFromUser: {
    backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    alignSelf: "flex-end",
    width: "80%",
  },
  messageFromOther: {
    backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
    alignSelf: "flex-start",
    width: "80%",
  },
});
