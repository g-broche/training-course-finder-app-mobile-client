import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQuery } from "@tanstack/react-query";
import AnnounceData from "../../../../src/components/announces/announce-data";
import NavigationButton from "../../../../src/components/buttons/navigation-button";
import ChatMenu from "../../../../src/components/discussions/discussion-menu";
import ErrorText from "../../../../src/components/error-text";
import { getAnnounceDetails } from "../../../../src/services/announceService";
import { containerStyles } from "../../../../src/styles/containerStyles";

export default function AnnounceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["announce-details", id],
    queryFn: () => getAnnounceDetails(id),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <NavigationButton
            title="Back to Found Items"
            pathname="announces/found"
          />
          {isLoading && <ActivityIndicator />}
          {isError && <ErrorText error={error} />}
          {!isLoading && data && (
            <>
              <AnnounceData announce={data} />
              <ChatMenu announce={data} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
