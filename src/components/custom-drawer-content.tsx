import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Href, usePathname, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { drawerStyles } from "../styles/drawerStyles";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  const drawerItems: { label: string; route: Href }[] = [
    { label: "Home", route: "/" },
    { label: "Found", route: "/announces/found" },
    { label: "Lost", route: "/announces/lost" },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={drawerStyles.drawer}
    >
      {drawerItems.map(({ label, route }) => {
        const isActive =
          route === "/"
            ? pathname === "/" || pathname === "/(tabs)"
            : pathname.startsWith(route as string);

        return (
          <Pressable
            key={String(route)}
            onPress={() => {
              router.push(route);
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={drawerStyles.item}
          >
            <Text
              style={[drawerStyles.label, isActive && drawerStyles.activeLabel]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </DrawerContentScrollView>
  );
}
