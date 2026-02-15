import { Text, View } from "react-native";
import { textStyles } from "../../styles/textStyles";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({
  message = "An unexpected error has occurred.",
}: ErrorStateProps) {
  return (
    <View>
      <Text style={textStyles.error}>{message}</Text>
    </View>
  );
}
