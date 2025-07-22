import { Text, TouchableOpacity } from 'react-native';
import { buttonStyles } from '../../styles/buttonStyles';
import { textStyles } from '../../styles/textStyles';


interface ActionButtonProps {
  title: string;
  callback: (...args: any[]) => any;
}

export default function ActionButton({ title, callback }: ActionButtonProps) {

  return (
    <TouchableOpacity style={buttonStyles.default} onPress={() => callback()}>
      <Text style={buttonStyles.label}>{title}</Text>
    </TouchableOpacity>
  );
}