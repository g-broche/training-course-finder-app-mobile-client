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
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function RootLayout() {
    useEffect(() => {
        if (Platform.OS === "android") {
            (async () => {
                await NavigationBar.setBackgroundColorAsync(COLOR_STYLES.defaultTheme.colorPrimary);
                await NavigationBar.setButtonStyleAsync("light");
                await NavigationBar.setBorderColorAsync("transparent");
            })();
        }
    }, []);

    const Content = () => {
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary }}>
                    <StatusBar style="light" />
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
            <QueryClientProvider client={queryClient}>
                <Content />
            </QueryClientProvider>
        </AuthProvider>
    );
}