import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useAnnounceDiscussions } from "../../hooks/discussion/useAnnounceDiscussions";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { textStyles } from "../../styles/textStyles";
import { Announce } from "../../types/dto";
import MessageForm from "../forms/message-form";
import { EmptyState } from "../shared/empty-state copy";
import { ErrorState } from "../shared/error-state";
import { LoaderState } from "../shared/loader-state";
import AnnounceAuthorChatInterface from "./announce-author-discussion-interface";
import { DiscussionView } from "./discussion-view";
import GuestChatInterface from "./guest-discussion-interface";

type DiscussionMenuProps = {
  announce: Announce;
};

export default function DiscussionMenu({ announce }: DiscussionMenuProps) {
  // Getting authentification state from AuthContext
  const { authState } = useAuth();

  // Getting discussions related to the announce for which the user is involved
  const {
    data: discussions,
    isLoading,
    isError,
  } = useAnnounceDiscussions({ announceId: announce.id });

  // Booleans centralizing logic for determining which behavior to display
  const isOpen = announce.interactivityState === "open";

  const hasLoadedAndAuthorUser =
    !isLoading &&
    !!discussions &&
    authState.user &&
    authState.user.displayName === announce.author.displayName;

  const hasLoadedAndNotAuthorUser =
    !isLoading &&
    !!discussions &&
    authState.user &&
    authState.user.displayName !== announce.author.displayName;

  // guest display interface if user is not authenticated
  if (!!authState && authState.user == null) {
    return <GuestChatInterface />;
  }
  // display loader if discussions are loading
  if (isLoading) {
    return <LoaderState />;
  }
  // display error state if there is an error while fetching discussions
  if (isError) {
    return <ErrorState />;
  }

  // display interface for the author of the announce
  if (hasLoadedAndAuthorUser) {
    return (
      <View style={styles.container}>
        {discussions?.length === 0 && (
          <EmptyState message="There are no discussions for this announce" />
        )}
        {discussions?.length > 0 && (
          <>
            <Text
              style={[
                textStyles.heading3,
                { marginBottom: DIMENSIONS.spacings.gaps.l },
              ]}
            >
              Open discussions
            </Text>
            <AnnounceAuthorChatInterface
              discussions={discussions}
              isAnnounceInteractivityOpen={isOpen}
            />
          </>
        )}
      </View>
    );
  }
  // display interface for users who are not the author
  if (hasLoadedAndNotAuthorUser) {
    return (
      <View style={styles.container}>
        {/* if announce open and no ongoing discussion allow to start a new discussion */}
        {discussions?.length === 0 && isOpen && (
          <MessageForm announceId={announce.id} isDiscussionStarter={true} />
        )}
        {/* if announce closed and no ongoing discussion show a simple message */}
        {discussions?.length === 0 && !isOpen && (
          <EmptyState message="This announce is closed" />
        )}
        {/* if announce open and there is an ongoing discussion show the discussion view */}
        {discussions?.length > 0 && (
          <DiscussionView
            discussionId={discussions[0].discussionId}
            announceAuthorDisplayName={announce.author.displayName}
            isAnnounceInteractivityOpen={isOpen}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
