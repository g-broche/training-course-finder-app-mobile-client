import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { COLOR_STYLES } from '../../src/styles/constants/colors';
import CustomHeader from '../../src/components/header/app-header';

type DrawerParamList = {
    '(tabs)': undefined;
    settings: undefined;
    profile: undefined;
};

export default function TabsLayout() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <Tabs
            screenOptions={{
                header: () => <CustomHeader />,
                tabBarActiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
                tabBarInactiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
                tabBarStyle: { backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundPrimary },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }} />
            <Tabs.Screen
                name="found"
                options={{
                    title: 'Found',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flag" size={size} color={color} />
                    )
                }} />
            <Tabs.Screen
                name="lost"
                options={{
                    title: 'Lost',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    )
                }} />
        </Tabs>
    );
}