import { View } from "react-native";
import ViewTitle from "../../../src/components/view-title";
import { containerStyles } from "../../../src/styles/containerStyles";
import FoundItemForm from "../../../src/components/forms/found-item-form";

export default function SubmitFound() {
    return (
        <View style={containerStyles.main}>
            <ViewTitle title="Submit a found item" />
            <FoundItemForm></FoundItemForm>
        </View>
    )
}