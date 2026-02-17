import { Text, TouchableOpacity } from "react-native";
import { buttonStyles } from "../../styles/buttonStyles";

type ButtonSizes = "default" | "wide" | "full";

interface ActionButtonProps {
  title: string;
  size?: ButtonSizes;
  callback: (...args: any[]) => any;
  disabled?: boolean;
}

export default function ActionButton({
  title,
  size = "default",
  callback,
  disabled = false,
}: ActionButtonProps) {
  const style = () => {
    switch (size) {
      case "wide":
        return buttonStyles.wide;
      case "full":
        return buttonStyles.full;
      case "default":
        return buttonStyles.default;
      default:
        return buttonStyles.default;
    }
  };
  return (
    <TouchableOpacity
      style={[style(), disabled && { opacity: 0.5 }]}
      onPress={() => callback()}
      disabled={disabled}
    >
      <Text style={buttonStyles.label}>{title}</Text>
    </TouchableOpacity>
  );
}
