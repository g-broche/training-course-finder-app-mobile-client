import { Text } from "react-native";
import { textStyles } from "../../styles/textStyles";

interface ErrorProps {
  error: Error;
}

export default function ErrorText({ error }: ErrorProps) {
  return <Text style={textStyles.error}>Error: {error.message}</Text>;
}
