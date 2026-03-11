import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { buttonStyles } from "../../../styles/buttonStyles";
import { RouteDefinition } from "../../../types/app";

export default function NavigationButton({
  title,
  pathname,
  params,
}: RouteDefinition) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={buttonStyles.default}
      onPress={() => router.push({ pathname: pathname as any, params })}
    >
      <Text style={buttonStyles.label}>{title}</Text>
    </TouchableOpacity>
  );
}
