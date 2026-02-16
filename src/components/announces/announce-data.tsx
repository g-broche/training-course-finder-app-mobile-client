import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useUpdateAnnounceInteractivity } from "../../hooks/announce/useUpdateAnnounceInteractivity";
import { useUpdateAnnounceStatus } from "../../hooks/announce/useUpdateAnnounceStatus";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { containerStyles } from "../../styles/containerStyles";
import { mediaStyles } from "../../styles/mediaStyles";
import { textStyles } from "../../styles/textStyles";
import { Announce } from "../../types/dto";
import { AnnounceStatus, InteractivityState } from "../../types/type";
import {
    isAnnounceTypeFound,
    isImageIncludedInAnnounce,
} from "../../utils/dtoUtil";
import { formatDate } from "../../utils/pipe";
import ActionButton from "../buttons/action-button";
import MapDisplay from "../map-display";
import ViewTitle from "../view-title";

type Props = {
  announce: Announce;
};

const renderHeader = (announce: Announce) => {
  const dateContent = isAnnounceTypeFound(announce)
    ? `Reported found : ${formatDate(announce.createdAt)}`
    : `Reported lost : ${formatDate(announce.createdAt)}`;
  return (
    <View style={{ alignItems: "flex-start", width: "100%" }}>
      <Text style={textStyles.metadata}>{dateContent}</Text>
      <Text style={textStyles.metadata}>
        Found in : {announce.city} ({announce.country})
      </Text>
      <Text style={textStyles.metadata}>
        Posted by: {announce.author.displayName}
      </Text>
    </View>
  );
};

export default function AnnounceData({ announce }: Props) {
  const { authState } = useAuth();
  const { mutate: updateStatus, isPending: isStatusPending } =
    useUpdateAnnounceStatus({
      announceId: announce.id,
    });
  const { mutate: updateInteractivity, isPending: isInteractivityPending } =
    useUpdateAnnounceInteractivity({
      announceId: announce.id,
    });

  const isUserAuthor =
    authState?.user?.displayName === announce.author.displayName;

  const handleStatusUpdate = (newStatus: AnnounceStatus) => {
    updateStatus(newStatus, {
      onSuccess: () => {
        Alert.alert("Success", `Announce status updated to ${newStatus}`);
      },
      onError: (error) => {
        Alert.alert("Error", `Failed to update status: ${error.message}`);
      },
    });
  };

  const handleInteractivityUpdate = (newState: InteractivityState) => {
    updateInteractivity(newState, {
      onSuccess: () => {
        Alert.alert("Success", `Announce interactivity updated to ${newState}`);
      },
      onError: (error) => {
        Alert.alert(
          "Error",
          `Failed to update interactivity: ${error.message}`,
        );
      },
    });
  };

  return (
    <View style={containerStyles.announceDetail}>
      {renderHeader(announce)}
      <ViewTitle title={announce.title} />
      {isImageIncludedInAnnounce(announce) && (
        <Image
          source={{ uri: announce.photo }}
          style={mediaStyles.image}
          resizeMode="contain"
        />
      )}
      <Text
        style={textStyles.default}
      >{`Description : ${announce.description}`}</Text>
      <Text style={textStyles.default}>Location where found</Text>
      <MapDisplay latitude={announce.latitude} longitude={announce.longitude} />

      {isUserAuthor && (
        <View style={styles.actionSection}>
          <View style={styles.actionWrapper}>
            <Text style={textStyles.default}>
              Current status: {announce.status}
            </Text>
            {announce.status === "unsolved" ? (
              <ActionButton
                title={isStatusPending ? "Updating..." : "Mark as Solved"}
                callback={() => handleStatusUpdate("solved")}
              />
            ) : (
              <ActionButton
                title={isStatusPending ? "Updating..." : "Mark as Unsolved"}
                callback={() => handleStatusUpdate("unsolved")}
              />
            )}
          </View>
          <View style={styles.actionWrapper}>
            <Text style={textStyles.default}>
              Interactivity state: {announce.interactivityState}
            </Text>
            {announce.interactivityState === "open" ? (
              <ActionButton
                title={
                  isInteractivityPending ? "Updating..." : "Close Discussions"
                }
                callback={() => handleInteractivityUpdate("close")}
              />
            ) : (
              <ActionButton
                title={
                  isInteractivityPending ? "Updating..." : "Open Discussions"
                }
                callback={() => handleInteractivityUpdate("open")}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actionSection: {
    gap: DIMENSIONS.spacings.gaps.l,
  },
  actionWrapper: {
    gap: DIMENSIONS.spacings.gaps.s,
  },
});
