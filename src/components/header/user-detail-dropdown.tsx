import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLOR_STYLES } from '../../styles/constants/colors';
import { DIMENSIONS } from '../../styles/constants/dimensions';
import { FONT_STYLES } from '../../styles/constants/fonts';
import DangerButton from '../buttons/danger-button';

export default function UserDetailDropdown() {
    const { authState, onLogout } = useAuth();

    return (
        authState.user
            ? (
                <View style={styles.dropdown}>
                    <Text style={styles.text}>{authState.user.displayName}</Text>
                    <Text style={styles.text}>{authState.user.email}</Text>
                    <DangerButton title='Logout' callback={onLogout}></DangerButton>
                </View>
            )
            : null
    );
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        right: 0,
        top: DIMENSIONS.sizes.interactives.width,
        elevation: 5,
        zIndex: 10,
        shadowColor: COLOR_STYLES.defaultTheme.colorBackdrop,
        shadowOpacity: 0.6,
        shadowRadius: 4,
        borderRadius: 8,
        padding: 12,
        width: 200,
        backgroundColor: COLOR_STYLES.defaultTheme.colorTertiary,
        gap: DIMENSIONS.spacings.gaps.m
    },
    text: {
        fontWeight: FONT_STYLES.weight.bolder,
        fontSize: FONT_STYLES.sizes.m,
    },
    logoutText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },
});