import React from "react";
import { View } from "react-native";
import { containerStyles } from "../../../src/styles/containerStyles";
import ViewTitle from "../../../src/components/view-title";

export default function Home() {
    return (
        <View style={containerStyles.main}>
            <ViewTitle title="Lost items" />
        </View>
    )
}