import { Text } from 'react-native';
import { textStyles } from '../styles/textStyles';


interface titleProps {
    title: string;
}

export default function ViewTitle({ title }: titleProps) {

    return (
        <Text style={textStyles.heading1}>{title}</Text>
    );
}