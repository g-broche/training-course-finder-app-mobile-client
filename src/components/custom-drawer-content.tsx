import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useRouter, usePathname } from 'expo-router';
import { drawerStyles } from '../styles/drawerStyles';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  const drawerItems = [
    { label: 'Home', route: '/home' },
    { label: 'Found', route: '/found' },
    { label: 'Lost', route: '/lost' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={drawerStyles.drawer}>
      {drawerItems.map(({ label, route }) => {
        const isActive = pathname === route;

        return (
          <Pressable
            key={route}
            onPress={() => {
              router.push(route);
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={drawerStyles.item}
          >
            <Text style={[drawerStyles.label, isActive && drawerStyles.activeLabel]}>{label}</Text>
          </Pressable>
        );
      })}
    </DrawerContentScrollView>
  );
}