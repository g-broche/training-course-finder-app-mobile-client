import React from "react";
import { View } from "react-native";
import { containerStyles } from "../../../src/styles/containerStyles";
import ViewTitle from "../../../src/components/view-title";
import NavigationButton from "../../../src/components/buttons/navigation-button";

export default function Home() {
    return (
        <View style={containerStyles.main}>
            <ViewTitle title="Found items" />
            <NavigationButton title="Report found item" pathname="/found/submit"></NavigationButton>
        </View>
    )
}