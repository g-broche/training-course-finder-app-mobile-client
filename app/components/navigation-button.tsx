import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { buttonStyles } from '../styles/buttonStyles';
import { textStyles } from '../styles/textStyles';
import { RouteDefinition } from '../types/interface';


export default function NavigationButton({ title, pathname, params }: RouteDefinition) {
    const router = useRouter();

    return (
        <TouchableOpacity style={buttonStyles.default} onPress={() => router.push({ pathname, params })}>
            <Text style={textStyles.default}>{title}</Text>
        </TouchableOpacity>
    );
}