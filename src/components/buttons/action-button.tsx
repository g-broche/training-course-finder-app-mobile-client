import { Text, TouchableOpacity } from 'react-native';
import { buttonStyles } from '../../styles/buttonStyles';
import { textStyles } from '../../styles/textStyles';

type ButtonSizes = "default" | 'wide';

interface ActionButtonProps {
  title: string;
  size?: ButtonSizes
  callback: (...args: any[]) => any;
}

export default function ActionButton({ title, size = "default", callback }: ActionButtonProps) {
  const style = size === "default" ? buttonStyles.default : buttonStyles.wide;
  return (
    <TouchableOpacity
      style={style} onPress={() => callback()}>
      <Text style={buttonStyles.label}>{title}</Text>
    </TouchableOpacity>
  );
}