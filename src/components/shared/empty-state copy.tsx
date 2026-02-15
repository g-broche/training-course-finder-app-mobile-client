import { Text, View } from "react-native";
import { textStyles } from "../../styles/textStyles";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "No results to display.",
}: EmptyStateProps) {
  return (
    <View>
      <Text style={textStyles.default}>{message}</Text>
    </View>
  );
}
