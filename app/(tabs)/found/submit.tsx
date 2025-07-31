import { SafeAreaView, ScrollView, View } from "react-native";
import ViewTitle from "../../../src/components/view-title";
import { containerStyles } from "../../../src/styles/containerStyles";
import FoundItemForm from "../../../src/components/forms/found-item-form";
import { formStyles } from "../../../src/styles/formStyles";

export default function SubmitFound() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={containerStyles.main}>
                    <ViewTitle title="Submit a found item" />
                    <FoundItemForm></FoundItemForm>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}