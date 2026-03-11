import { Text } from "react-native";
import { textStyles } from "../../styles/textStyles";

interface TitleProps {
  title: string;
}

export default function ViewTitle({ title }: TitleProps) {
  return <Text style={textStyles.heading1}>{title}</Text>;
}
