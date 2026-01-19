import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../src/context/AuthContext";
import { COLOR_STYLES } from "../src/styles/constants/colors";

const queryClient = new QueryClient();

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
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
          }}
        >
          <Slot />
        </View>
      </SafeAreaProvider>
      // <SafeAreaProvider>
      //     <View style={{ flex: 1, backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary }}>
      //         <StatusBar style="light" />
      //         <Drawer
      //             screenOptions={{
      //                 headerShown: false,
      //                 drawerStyle: {
      //                     width: DIMENSIONS.sizes.drawer.width,
      //                     backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
      //                 },
      //             }}
      //             drawerContent={(props) => <CustomDrawerContent {...props} />}
      //         >
      //             <Slot />
      //         </Drawer>
      //     </View>
      // </SafeAreaProvider >
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
