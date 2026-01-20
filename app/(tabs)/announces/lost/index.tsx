import React from "react";
import { View } from "react-native";
import ViewTitle from "../../../../src/components/view-title";
import { containerStyles } from "../../../../src/styles/containerStyles";

export default function LostIndex() {
  return (
    <View style={containerStyles.main}>
      <ViewTitle title="Lost items" />
    </View>
  );
}
