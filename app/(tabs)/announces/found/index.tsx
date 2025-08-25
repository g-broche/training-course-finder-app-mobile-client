import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../../../src/services/announceService";
import { SearchAnnounceFilter } from "../../../../src/types/request";
import { containerStyles } from "../../../../src/styles/containerStyles";
import ViewTitle from "../../../../src/components/view-title";
import NavigationButton from "../../../../src/components/buttons/navigation-button";
import AnnounceFilterForm from "../../../../src/components/forms/announce-filter-form";
import AnnounceGrid from "../../../../src/components/announces/announce-grid";
import Paginator from "../../../../src/components/paginator";


export default function foundIndex() {
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState({})
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['found-announces', currentPage, filter],
        queryFn: () => getPaginatedFoundAnnounce(currentPage, filter),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: 'always',
    });
    const updateSearch = (filter: SearchAnnounceFilter) => {
        setCurrentPage(0);
        setFilter(filter);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={containerStyles.main}>
                    <ViewTitle title="Found items" />
                    <NavigationButton title="Report found item" pathname="announces/found/submit"></NavigationButton>
                    <AnnounceFilterForm onFilterSubmit={(filter) => updateSearch(filter)} />
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
                    )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}