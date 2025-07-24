import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, Text, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { COLOR_STYLES } from '../../src/styles/constants/colors';
// import CustomHeader from '../../src/components/header/app-header';
import AppHeader from '../../src/components/header/app-header';
import { useContext, useState } from 'react';
import Modal from 'react-native-modal';
import SignUpForm from '../../src/components/forms/sign-up-form';
import SignInForm from '../../src/components/forms/sign-in-form';
import { modalStyles } from '../../src/styles/modalStyles';
import { AuthContext, AuthProvider } from '../../src/context/AuthContext';

type DrawerParamList = {
    '(tabs)': undefined;
    settings: undefined;
    profile: undefined;
};

export default function TabsLayout() {
    const authState = useContext(AuthContext)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const openSignInModal = () => {
        setIsSignUp(false);
        setModalVisible(true);
    };

    const openSignUpModal = () => {
        setIsSignUp(true);
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    return (
        <>
            <AuthProvider>
                <Tabs
                    screenOptions={{
                        header: () => (
                            <AppHeader
                                onSignInPress={openSignInModal}
                            />
                        ),
                        tabBarActiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
                        tabBarInactiveTintColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
                        tabBarStyle: { backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary },
                    }}
                >
                    <Tabs.Screen
                        name="home"
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
                        }}
                    />
                    <Tabs.Screen
                        name="found"
                        options={{
                            title: 'Found',
                            tabBarIcon: ({ color, size }) => <Ionicons name="flag" size={size} color={color} />
                        }}
                    />
                    <Tabs.Screen
                        name="lost"
                        options={{
                            title: 'Lost',
                            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />
                        }}
                    />
                </Tabs>

                <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                    <ScrollView style={modalStyles.container}>
                        {isSignUp ? <SignUpForm /> : <SignInForm />}

                        <Pressable onPress={() => setIsSignUp(!isSignUp)} style={{ marginTop: 10 }}>
                            <Text style={{ color: COLOR_STYLES.defaultTheme.colorInteractiveActive, textAlign: 'center' }}>
                                {isSignUp
                                    ? 'Already have an account? Sign in'
                                    : 'No account? Sign up'}
                            </Text>
                        </Pressable>

                        <Pressable onPress={closeModal} style={{ marginTop: 20 }}>
                            <Text style={{ color: COLOR_STYLES.defaultTheme.colorTertiary, textAlign: 'center' }}>Close</Text>
                        </Pressable>
                    </ScrollView>
                </Modal>
            </AuthProvider>
        </>

    );
}