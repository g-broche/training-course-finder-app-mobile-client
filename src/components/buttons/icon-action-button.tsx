import { Ionicons } from '@expo/vector-icons';
import { DIMENSIONS } from '../../styles/constants/dimensions';
import { COLOR_STYLES } from '../../styles/constants/colors';
import { TouchableOpacity } from 'react-native';
import { buttonStyles } from '../../styles/buttonStyles';

interface IconActionButtonProps {
    iconName: keyof typeof Ionicons.glyphMap;
    callback: (...args: any[]) => any;
    size?: number;
    color?: string;
}

export default function IconActionButton({
    iconName,
    callback,
    size = DIMENSIONS.sizes.interactives.width,
    color = COLOR_STYLES.defaultTheme.colorInteractiveActive,
}: IconActionButtonProps) {
    return (
        <TouchableOpacity onPress={callback} style={buttonStyles.icon}>
            <Ionicons name={iconName} size={size} color={color} />
        </TouchableOpacity>
    );
}