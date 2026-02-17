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

type Props = {
  announce: Announce;
};

export default function DiscussionMenu({ announce }: Props) {
  const { authState } = useAuth();
  const {
    data: discussions,
    isLoading,
    isError,
  } = useAnnounceDiscussions({ announceId: announce.id });
  const isOpen = announce.interactivityState === "open";
  if (!!authState && authState.user == null) {
    return <GuestChatInterface />;
  }
  if (isLoading) {
    return <LoaderState />;
  }
  if (isError) {
    return <ErrorState />;
  }
  if (
    !isLoading &&
    !!discussions &&
    authState.user &&
    authState.user.displayName === announce.author.displayName
  ) {
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
  if (
    !isLoading &&
    !!discussions &&
    authState.user &&
    authState.user.displayName !== announce.author.displayName
  ) {
    return (
      <View style={styles.container}>
        {discussions?.length === 0 && isOpen && (
          <MessageForm announceId={announce.id} isDiscussionStarter={true} />
        )}
        {discussions?.length === 0 && !isOpen && (
          <EmptyState message="This announce is closed" />
        )}
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
