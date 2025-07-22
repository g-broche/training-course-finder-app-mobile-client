import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { headerStyles } from '../../styles/headerStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyles } from '../../styles/containerStyles';
import { DIMENSIONS } from '../../styles/constants/dimensions';
import { COLOR_STYLES } from '../../styles/constants/colors';
import HeaderUserAuth from './header-user-auth';
import Burger from './burger';

export default function AppHeader() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <SafeAreaView style={containerStyles.viewContainer}>
            <View style={headerStyles.container}>
                <Burger></Burger>

                <Text style={headerStyles.title}>Retriever</Text>

                <View style={headerStyles.actions}>
                    <HeaderUserAuth></HeaderUserAuth>
                </View>
            </View>
        </SafeAreaView>
    );
}