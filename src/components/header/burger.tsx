import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { headerStyles } from '../../styles/headerStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyles } from '../../styles/containerStyles';
import { DIMENSIONS } from '../../styles/constants/dimensions';
import { COLOR_STYLES } from '../../styles/constants/colors';
import HeaderUserAuth from './header-user-auth';

export default function BurgerButton() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <Pressable onPress={() => navigation.openDrawer()} style={headerStyles.icon}>
            <Ionicons
                name="menu"
                size={DIMENSIONS.sizes.interactives.width}
                color={COLOR_STYLES.defaultTheme.colorInteractiveActive} />
        </Pressable>
    );
}