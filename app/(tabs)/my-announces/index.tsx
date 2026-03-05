import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnnounceGrid from "../../../src/components/announces/announce-grid";
import Paginator from "../../../src/components/shared/paginator";
import ViewTitle from "../../../src/components/shared/view-title";
import { usePaginatedUserAnnounces } from "../../../src/hooks/announce/usePaginatedUserAnnounces";
import { containerStyles } from "../../../src/styles/containerStyles";

export default function MyAnnouncesIndex() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError, error } = usePaginatedUserAnnounces({
    currentPage,
    size: 10,
  });

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <ViewTitle title="My announces" />

          {isLoading && <ActivityIndicator />}
          {isError && <Text>Error: {String(error)}</Text>}

          {!isLoading &&
            !isError &&
            data?.content &&
            data.content.length > 0 && (
              <>
                <AnnounceGrid announces={data.content} />
                {data.totalPages && data.totalPages > 1 && (
                  <Paginator
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={(pageIndex) => setCurrentPage(pageIndex)}
                  />
                )}
              </>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
