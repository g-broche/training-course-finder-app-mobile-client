import { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Discussion } from "../../types/dto";
import { DiscussionCard } from "./discussion-card";
import { DiscussionView } from "./discussion-view";

interface AnnounceAuthorDiscussionInterfaceProps {
  discussions: Discussion[];
}

export default function AnnounceAuthorDiscussionInterface({
  discussions,
}: AnnounceAuthorDiscussionInterfaceProps) {
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    string | null
  >(null);

  const handleOpenDiscussion = (discussionId: string) => {
    setSelectedDiscussionId(discussionId);
  };

  const handleCloseModal = () => {
    setSelectedDiscussionId(null);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {discussions.map((discussion) => (
          <DiscussionCard
            key={discussion.discussionId}
            discussion={discussion}
            onPress={() => handleOpenDiscussion(discussion.discussionId)}
          />
        ))}
      </ScrollView>

      <Modal
        visible={selectedDiscussionId !== null}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{ padding: 16, backgroundColor: "#f0f0f0" }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          {selectedDiscussionId && (
            <DiscussionView discussionId={selectedDiscussionId} />
          )}
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
  },
});
