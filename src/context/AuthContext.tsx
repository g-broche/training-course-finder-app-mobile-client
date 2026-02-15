import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { invalidateAllQueries } from "../core/queryClient";
import {
    getUserFromToken,
    loginUser,
    registerUser,
} from "../services/authService";
import { LoggedUser } from "../types/dto";
import { Credentials, SignUpData } from "../types/request";

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  user: LoggedUser | null;
}

interface AuthProps {
  authState?: AuthState;
  onRegister?: (data: SignUpData) => Promise<void>;
  onLogin?: (credentials: Credentials) => Promise<void>;
  onLogout?: () => Promise<void>;
}

const TOKEN_KEY = "jwt";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const user = getUserFromToken(token);
        setAuthState({
          token,
          authenticated: true,
          user,
        });
      } else {
        setAuthState({
          token: null,
          authenticated: false,
          user: null,
        });
      }
    };

    loadToken();
  }, []);

  const register = async (data: SignUpData): Promise<void> => {
    try {
      const response = await registerUser(data);
      const isAuthResponseValid =
        response.success &&
        response.data.jwt &&
        typeof response.data.jwt === "string" &&
        response.data.jwt.length > 0;
      if (!isAuthResponseValid) {
        Alert.alert(
          "Sign up error",
          response.message || "Unknown error occured during sign up",
        );
        return;
      }
      const token = response.data.jwt;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      const loggedUser = getUserFromToken(token);
      setAuthState({
        token: token,
        authenticated: true,
        user: loggedUser,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Sign up error", "Unknown error occured during sign up");
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const response = await loginUser(credentials);
      console.log("login response", response);
      const isAuthResponseValid =
        response.success &&
        response.data.jwt &&
        typeof response.data.jwt === "string" &&
        response.data.jwt.length > 0;
      if (!isAuthResponseValid) {
        const message =
          response.message || "Unknown error occured during sign in";
        console.log("should display error");
        Alert.alert("Sign in error", message);
        return;
      }
      const token = response.data.jwt;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      const loggedUser = getUserFromToken(token);
      setAuthState({
        token: token,
        authenticated: true,
        user: loggedUser,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false,
      user: null,
    });
    router.replace("/");
    invalidateAllQueries();
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
