import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LostItemForm from "../../../../src/components/forms/lost-item-form";
import ViewTitle from "../../../../src/components/shared/view-title";
import { containerStyles } from "../../../../src/styles/containerStyles";

export default function SubmitLost() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <ViewTitle title="Submit a lost item" />
          <LostItemForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
