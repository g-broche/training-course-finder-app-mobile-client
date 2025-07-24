import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLOR_STYLES } from '../src/styles/constants/colors';
import CustomDrawerContent from '../src/components/custom-drawer-content';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { DIMENSIONS } from '../src/styles/constants/dimensions';
import { Platform, View } from 'react-native';
import { AuthProvider } from '../src/context/AuthContext';
import { Slot, Stack } from 'expo-router';
import AppHeader from '../src/components/header/app-header';

export default function RootLayout() {
    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setButtonStyleAsync('light');
            SystemUI.setBackgroundColorAsync(COLOR_STYLES.defaultTheme.colorPrimary);
        }
    }, []);

    const InitialLayout = () => {
        return (
            <SafeAreaProvider>
                <StatusBar style="light" />
                <Stack>
                    <Stack.Screen
                        name='(tabs)'
                        options={{
                            header: () => (<AppHeader />),
                            animation: "none"
                        }}
                    />
                </Stack>
            </SafeAreaProvider>
        )
    }

    const BackupLayoutThatMayWorkInACentury = () => {
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary }}>
                    <Drawer
                        screenOptions={{
                            headerShown: false,
                            drawerStyle: {
                                width: DIMENSIONS.sizes.drawer.width,
                                backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
                            },
                        }}
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                    >
                        <Slot />
                    </Drawer>
                </View>
            </SafeAreaProvider >
        )
    }

    return (
        <AuthProvider>
            <InitialLayout />
        </AuthProvider>
    );
}