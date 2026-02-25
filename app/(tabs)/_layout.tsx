import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import Modal from "react-native-modal";
import SignInForm from "../../src/components/forms/sign-in-form";
import SignUpForm from "../../src/components/forms/sign-up-form";
import AppHeader from "../../src/components/header/app-header";
import { useAuth } from "../../src/context/AuthContext";
import { COLOR_STYLES } from "../../src/styles/constants/colors";
import { containerStyles } from "../../src/styles/containerStyles";

export default function TabsLayout() {
  const { authState } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openSignInModal = () => {
    setIsSignUp(false);
    setModalVisible(true);
  };

  useEffect(() => {
    if (authState?.authenticated) {
      closeModal();
    }
  }, [authState?.authenticated]);

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => <AppHeader onSignInPress={openSignInModal} />,
          tabBarActiveTintColor:
            COLOR_STYLES.defaultTheme.colorInteractiveActive,
          tabBarInactiveTintColor:
            COLOR_STYLES.defaultTheme.colorInteractiveInactive,
          tabBarStyle: {
            backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="announces/found"
          options={{
            title: "Found",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flag" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="announces/lost"
          options={{
            title: "Lost",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <ScrollView contentContainerStyle={containerStyles.modalScrollview}>
          {isSignUp ? <SignUpForm /> : <SignInForm />}

          <Pressable
            onPress={() => setIsSignUp(!isSignUp)}
            style={{ marginTop: 10 }}
          >
            <Text
              style={{
                color: COLOR_STYLES.defaultTheme.colorInteractiveActive,
                textAlign: "center",
              }}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "No account? Sign up"}
            </Text>
          </Pressable>

          <Pressable onPress={closeModal} style={{ marginTop: 20 }}>
            <Text
              style={{
                color: COLOR_STYLES.defaultTheme.colorTertiary,
                textAlign: "center",
              }}
            >
              Close
            </Text>
          </Pressable>
        </ScrollView>
      </Modal>
    </>
  );
}
