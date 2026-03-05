import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { clearAllQueries } from "../core/queryClient";
import {
  getUserFromToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import {
  setAuthRefreshFailureHandler,
  setTokenHandlers,
} from "../services/base-api-service";
import { LoggedUser } from "../types/dto";
import { Credentials, SignUpData } from "../types/request";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
  user: LoggedUser | null;
}

interface AuthProps {
  authState?: AuthState;
  onRegister?: (data: SignUpData) => Promise<void>;
  onLogin?: (credentials: Credentials) => Promise<void>;
  onLogout?: () => Promise<void>;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
    user: null,
  });

  // Function to update tokens (used by refresh logic in base-api-service)
  const updateTokens = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    const user = getUserFromToken(accessToken);
    setAuthState({
      accessToken,
      refreshToken,
      authenticated: true,
      user,
    });
  };

  // Register token handlers for base-api-service
  useEffect(() => {
    setTokenHandlers(
      () => ({
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken,
      }),
      updateTokens,
    );
  }, [authState.accessToken, authState.refreshToken]);

  const forceLogout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      user: null,
    });
    router.replace("/");
    await clearAllQueries();
  };

  // Register callback used by base-api-service when refresh fails.
  useEffect(() => {
    setAuthRefreshFailureHandler(forceLogout);
    return () => setAuthRefreshFailureHandler(null);
  }, []);

  useEffect(() => {
    const loadTokens = async () => {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

      if (accessToken) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        const user = getUserFromToken(accessToken);
        setAuthState({
          accessToken,
          refreshToken,
          authenticated: true,
          user,
        });
      } else {
        setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
          user: null,
        });
      }
    };

    loadTokens();
  }, []);

  const register = async (data: SignUpData): Promise<void> => {
    try {
      const response = await registerUser(data);
      const isAuthResponseValid =
        response.success &&
        response.data.accessToken &&
        response.data.refreshToken &&
        typeof response.data.accessToken === "string" &&
        typeof response.data.refreshToken === "string" &&
        response.data.accessToken.length > 0 &&
        response.data.refreshToken.length > 0;
      if (!isAuthResponseValid) {
        Alert.alert(
          "Sign up error",
          response.message || "Unknown error occured during sign up",
        );
        return;
      }
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
      const loggedUser = getUserFromToken(accessToken);
      setAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        authenticated: true,
        user: loggedUser,
      });
    } catch (error) {
      Alert.alert("Sign up error", "Unknown error occured during sign up");
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const response = await loginUser(credentials);
      const isAuthResponseValid =
        response.success &&
        response.data.accessToken &&
        response.data.refreshToken &&
        typeof response.data.accessToken === "string" &&
        typeof response.data.refreshToken === "string" &&
        response.data.accessToken.length > 0 &&
        response.data.refreshToken.length > 0;
      if (!isAuthResponseValid) {
        const message =
          response.message || "Unknown error occured during sign in";
        Alert.alert("Sign in error", message);
        return;
      }
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
      const loggedUser = getUserFromToken(accessToken);
      setAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        authenticated: true,
        user: loggedUser,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser(authState?.refreshToken || "");
    } finally {
      await forceLogout();
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
