import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLOR_STYLES } from '../src/styles/constants/colors';
import CustomDrawerContent from '../src/components/custom-drawer-content';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Drawer
                screenOptions={{ headerShown: false }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home' }} />
            </Drawer>
        </SafeAreaProvider>
    );
}

const drawerScreenOptions = {
    headerShown: false,
    drawerStyle: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundSecondary,
        width: 300,
    },
    drawerLabelStyle: {
        color: '#666',
        fontSize: 16,
    },
    drawerActiveTintColor: '#000',
    drawerInactiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
    drawerType: 'front' as const,
};
