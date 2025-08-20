import { SafeAreaView, ScrollView, View } from "react-native";
import { containerStyles } from "../../../../src/styles/containerStyles";
import ViewTitle from "../../../../src/components/view-title";
import FoundItemForm from "../../../../src/components/forms/found-item-form";

export default function SubmitFound() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={containerStyles.main}>
                    <ViewTitle title="Submit a found item" />
                    <FoundItemForm />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}