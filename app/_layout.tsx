import { QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomDrawerContent from "../src/components/custom-drawer-content";
import { AuthProvider } from "../src/context/AuthContext";
import { queryClient } from "../src/core/queryClient";
import { COLOR_STYLES } from "../src/styles/constants/colors";
import { DIMENSIONS } from "../src/styles/constants/dimensions";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      (async () => {
        await NavigationBar.setBackgroundColorAsync(
          COLOR_STYLES.defaultTheme.colorPrimary,
        );
        await NavigationBar.setButtonStyleAsync("light");
        await NavigationBar.setBorderColorAsync("transparent");
      })();
    }
  }, []);

  const Content = () => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
            }}
          >
            <StatusBar style="light" />
            <Drawer
              screenOptions={{
                headerShown: false,
                drawerStyle: {
                  width: DIMENSIONS.sizes.drawer.width,
                  backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
                },
                sceneStyle: {
                  backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
                },
              }}
              drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
              <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
            </Drawer>
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </AuthProvider>
  );
}
