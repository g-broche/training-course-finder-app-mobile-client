import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#007bff',
                    tabBarStyle: { backgroundColor: '#f8f8f8' },
                }}
            >
                <Tabs.Screen name="home" options={{ title: 'Accueil' }}
                />
                <Tabs.Screen name="profile" options={{ title: 'Profil' }}
                />
                <Tabs.Screen name="settings" options={{ title: 'Paramètres' }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}