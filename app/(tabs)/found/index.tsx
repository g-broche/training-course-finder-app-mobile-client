import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, View, Text } from "react-native";
import { containerStyles } from "../../../src/styles/containerStyles";
import ViewTitle from "../../../src/components/view-title";
import NavigationButton from "../../../src/components/buttons/navigation-button";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../../src/services/announceService";
import { Announce } from "../../../src/types/dto";
import AnnounceGrid from "../../../src/components/announces/announce-grid";
import Paginator from "../../../src/components/paginator";

export default function foundIndex() {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['found-announces', currentPage],
        queryFn: () => getPaginatedFoundAnnounce(currentPage),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: 'always',
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={containerStyles.main}>
                    <ViewTitle title="Found items" />
                    <NavigationButton title="Report found item" pathname="/found/submit"></NavigationButton>
                    {isLoading && <ActivityIndicator />}
                    {isError && <Text>Error: {String(error)}</Text>}
                    {!isLoading && data?.content && (
                        <>
                            <AnnounceGrid announces={data.content} />
                            <Paginator
                                currentPage={currentPage}
                                totalPages={data.totalPages}
                                onPageChange={(pageIndex) => setCurrentPage(pageIndex)}
                            />
                        </>
                    )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}