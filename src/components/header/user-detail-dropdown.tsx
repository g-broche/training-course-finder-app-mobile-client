import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { COLOR_STYLES } from '../../styles/constants/colors';
import { User } from '../../types/interface';
import { getUserFromToken } from '../../services/authService';
import { DIMENSIONS } from '../../styles/constants/dimensions';
import { FONT_STYLES } from '../../styles/constants/fonts';
import { buttonStyles } from '../../styles/buttonStyles';
import DangerButton from '../buttons/danger-button';

export default function UserDetailDropdown({ onLogout }: { onLogout: () => void }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserFromToken();
            setUser(userData);
        };
        fetchUser();
    }, []);

    if (!user) return null;

    return (
        <View style={styles.dropdown}>
            <Text style={styles.text}>{user.displayName}</Text>
            <Text style={styles.text}>{user.email}</Text>
            <DangerButton title='Logout' callback={onLogout}></DangerButton>
        </View>
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