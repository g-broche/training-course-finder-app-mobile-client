import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLOR_STYLES } from '../src/styles/constants/colors';
import CustomDrawerContent from '../src/components/custom-drawer-content';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { DIMENSIONS } from '../src/styles/constants/dimensions';

export default function RootLayout() {
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(COLOR_STYLES.defaultTheme.colorBackgroundPrimary);
        NavigationBar.setButtonStyleAsync('light');
    }, []);
    return (
        <>
            <StatusBar style="light" backgroundColor={COLOR_STYLES.defaultTheme.colorBackgroundPrimary} />
            <SafeAreaProvider>
                <Drawer
                    screenOptions={{
                        headerShown: false,
                        drawerStyle: {
                            width: DIMENSIONS.sizes.drawer.width,
                            backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundSecondary,
                        },
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home' }} />
                </Drawer>
            </SafeAreaProvider>
        </>
    );
}
