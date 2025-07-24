import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { headerStyles } from '../../styles/headerStyles';
import { useContext, useEffect, useState } from 'react';
import ActionButton from '../buttons/action-button';
import IconActionButton from '../buttons/icon-action-button';
import { COLOR_STYLES } from '../../styles/constants/colors';
import { DIMENSIONS } from '../../styles/constants/dimensions';
import { AuthContext, useAuth } from '../../context/AuthContext';

type HeaderUserAuthProps = {
    onSignInPress: () => void;
};

export default function HeaderUserAuth({ onSignInPress }: HeaderUserAuthProps) {
    const authState = useContext(AuthContext)

    if (!authState.state.authenticated) {
        return (
            <View>
                <ActionButton title="Sign in" callback={onSignInPress} />
            </View>
        );
    }

    return (
        <View>
            <IconActionButton
                iconName="person-circle-outline"
                size={DIMENSIONS.sizes.interactives.width}
                color={COLOR_STYLES.defaultTheme.colorInteractiveActive}
                callback={authState.logout}
            />
        </View>
    );
}