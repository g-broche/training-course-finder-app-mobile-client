import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native"
import { containerStyles } from "../../../../src/styles/containerStyles";
import ViewTitle from "../../../../src/components/view-title";
import { useQuery } from "@tanstack/react-query";
import { getAnnounceDetails } from "../../../../src/services/announceService";
import AnnounceData from "../../../../src/components/announces/announce-data";
import ErrorText from "../../../../src/components/error-text";

export default function AnnounceDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['announce-details', id],
        queryFn: () => getAnnounceDetails(id),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: 'always',
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={containerStyles.main}>
                    {isLoading && <ActivityIndicator />}
                    {isError && <ErrorText error={error} />}
                    {!isLoading && data && <AnnounceData announce={data} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}