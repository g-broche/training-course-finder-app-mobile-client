import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnnounceGrid from "../../../../src/components/announces/announce-grid";
import NavigationButton from "../../../../src/components/buttons/navigation-button";
import AnnounceFilterForm from "../../../../src/components/forms/announce-filter-form";
import Paginator from "../../../../src/components/paginator";
import ViewTitle from "../../../../src/components/view-title";
import { usePaginatedLost } from "../../../../src/hooks/announce/usePaginatedLost";
import { containerStyles } from "../../../../src/styles/containerStyles";
import { SearchAnnounceFilter } from "../../../../src/types/request";

export default function LostIndex() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({});
  const { data, isLoading, isError, error } = usePaginatedLost(
    currentPage,
    filter,
  );
  useEffect(() => {
    console.log("announces: ", data);
  }, [data]);
  const updateSearch = (filter: SearchAnnounceFilter) => {
    setCurrentPage(0);
    setFilter(filter);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <ViewTitle title="Lost items" />
          <NavigationButton
            title="Report lost item"
            pathname="announces/lost/submit"
          ></NavigationButton>
          <AnnounceFilterForm
            onFilterSubmit={(filter) => updateSearch(filter)}
          />
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
