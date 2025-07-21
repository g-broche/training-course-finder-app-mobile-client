import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLOR_STYLES } from './styles/constants/colors';
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
                    tabBarInactiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
                    tabBarStyle: { backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundPrimary },
                }}
            >
                <Tabs.Screen name="home" options={{ title: 'Home' }}
                />
                <Tabs.Screen name="found" options={{ title: 'Found' }}
                />
                <Tabs.Screen name="lost" options={{ title: 'Lost' }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}