import { useState } from "react";
import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import queryClient from "../../core/queryClient";
import { containerStyles } from "../../styles/containerStyles";
import { Discussion } from "../../types/dto";
import ActionButton from "../shared/buttons/action-button";
import { DiscussionCard } from "./discussion-card";
import { DiscussionView } from "./discussion-view";

interface AnnounceAuthorDiscussionInterfaceProps {
  discussions: Discussion[];
  isAnnounceInteractivityOpen: boolean;
}

export default function AnnounceAuthorDiscussionInterface({
  discussions,
  isAnnounceInteractivityOpen,
}: AnnounceAuthorDiscussionInterfaceProps) {
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Discussion | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleOpenDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleCloseModal = () => {
    setSelectedDiscussion(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["discussion"] });
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={containerStyles.sectionCentered}
      >
        {discussions.map((discussion) => (
          <DiscussionCard
            key={discussion.discussionId}
            discussion={discussion}
            onPress={() => handleOpenDiscussion(discussion)}
          />
        ))}
      </ScrollView>

      <Modal
        visible={selectedDiscussion !== null}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={containerStyles.BackgroundContainer}>
          <ActionButton title="Close" callback={handleCloseModal} size="full" />
          <ScrollView
            style={containerStyles.modalScrollview}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {selectedDiscussion && (
              <DiscussionView
                discussionId={selectedDiscussion.discussionId}
                announceAuthorDisplayName={
                  selectedDiscussion.announceAuthor.displayName
                }
                isAnnounceInteractivityOpen={isAnnounceInteractivityOpen}
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    width: "100%",
    gap: 20,
  },
});
