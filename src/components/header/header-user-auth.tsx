import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { headerStyles } from '../../styles/headerStyles';
import { useEffect, useState } from 'react';
import ActionButton from '../buttons/action-button';
import IconActionButton from '../buttons/icon-action-button';
import { COLOR_STYLES } from '../../styles/constants/colors';
import { DIMENSIONS } from '../../styles/constants/dimensions';

type HeaderUserAuthProps = {
    onSignInPress: () => void;
};

export default function HeaderUserAuth({ onSignInPress }: HeaderUserAuthProps) {
    const [logged, setLogged] = useState(false);

    const logUser = () => setLogged(true);
    const logoutUser = () => setLogged(false);

    if (!logged) {
        return (
            <View>
                {/* Instead of local state, call the parent's modal handler */}
                <ActionButton title="Sign in" callback={onSignInPress} />
            </View>
        );
    } else {
        return (
            <View>
                <IconActionButton
                    iconName="person-circle-outline"
                    size={DIMENSIONS.sizes.interactives.width}
                    color={COLOR_STYLES.defaultTheme.colorInteractiveActive}
                    callback={logoutUser}
                />
            </View>
        );
    }
}