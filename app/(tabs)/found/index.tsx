import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, View, Text } from "react-native";
import { containerStyles } from "../../../src/styles/containerStyles";
import ViewTitle from "../../../src/components/view-title";
import NavigationButton from "../../../src/components/buttons/navigation-button";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../../src/services/announceService";
import { Announce } from "../../../src/types/dto";
import AnnounceGrid from "../../../src/components/announces/announce-grid";

export default function foundIndex() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['found-announces'],
        queryFn: () => getPaginatedFoundAnnounce(0),
        staleTime: 0,
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={containerStyles.main}>
                    <ViewTitle title="Found items" />
                    <NavigationButton title="Report found item" pathname="/found/submit"></NavigationButton>
                    {isLoading && <ActivityIndicator />}
                    {isError && <Text>Error: {String(error)}</Text>}
                    {!isLoading && data?.content && <AnnounceGrid announces={data.content} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}