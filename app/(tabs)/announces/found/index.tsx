import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnnounceGrid from "../../../../src/components/announces/announce-grid";
import NavigationButton from "../../../../src/components/buttons/navigation-button";
import AnnounceFilterForm from "../../../../src/components/forms/announce-filter-form";
import Paginator from "../../../../src/components/paginator";
import ViewTitle from "../../../../src/components/view-title";
import { getPaginatedFoundAnnounce } from "../../../../src/services/announceService";
import { containerStyles } from "../../../../src/styles/containerStyles";
import { SearchAnnounceFilter } from "../../../../src/types/request";

export default function FoundIndex() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({});
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["found-announces", currentPage, filter],
    queryFn: () => getPaginatedFoundAnnounce(currentPage, filter),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });
  useEffect(() => {
    console.log("announces: ", data);
  }, [data]);
  const updateSearch = (filter: SearchAnnounceFilter) => {
    setCurrentPage(0);
    setFilter(filter);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <ViewTitle title="Found items" />
          <NavigationButton
            title="Report found item"
            pathname="announces/found/submit"
          ></NavigationButton>
          <AnnounceFilterForm
            onFilterSubmit={(filter) => updateSearch(filter)}
          />
          {isLoading && <ActivityIndicator />}
          {isError && <Text>Error: {String(error)}</Text>}
          {!isLoading && data?.content && (
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
