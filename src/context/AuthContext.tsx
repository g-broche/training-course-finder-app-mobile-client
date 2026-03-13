import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { clearAllQueries } from "../core/queryClient";
import {
  AuthSessionData,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
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

  // Function to update session (used by refresh logic in base-api-service)
  const updateTokens = useCallback(
    async (
      accessToken: string,
      refreshToken: string,
      userFromApi?: LoggedUser,
    ) => {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
      const user = userFromApi ?? authState.user;
      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
        user,
      });
    },
    [authState.user],
  );

  // Register token handlers for base-api-service
  useEffect(() => {
    setTokenHandlers(
      () => ({
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken,
      }),
      updateTokens,
    );
  }, [authState.accessToken, authState.refreshToken, updateTokens]);

  const forceLogout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
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
        const meResponse = await getCurrentUser(accessToken);
        const currentUser = meResponse.data as LoggedUser | undefined;

        if (meResponse.success && currentUser) {
          setAuthState({
            accessToken,
            refreshToken,
            authenticated: true,
            user: currentUser,
          });
          return;
        }

        if (refreshToken) {
          const response = await refreshAccessToken(refreshToken);
          const sessionData = response.data as AuthSessionData | undefined;
          if (response.success && sessionData) {
            await SecureStore.setItemAsync(
              ACCESS_TOKEN_KEY,
              sessionData.accessToken,
            );
            await SecureStore.setItemAsync(
              REFRESH_TOKEN_KEY,
              sessionData.refreshToken,
            );
            setAuthState({
              accessToken: sessionData.accessToken,
              refreshToken: sessionData.refreshToken,
              authenticated: true,
              user: sessionData.user,
            });
          } else {
            await forceLogout();
          }
        } else {
          await forceLogout();
        }
      } else if (refreshToken) {
        const response = await refreshAccessToken(refreshToken);
        const sessionData = response.data as AuthSessionData | undefined;
        if (response.success && sessionData) {
          await SecureStore.setItemAsync(
            ACCESS_TOKEN_KEY,
            sessionData.accessToken,
          );
          await SecureStore.setItemAsync(
            REFRESH_TOKEN_KEY,
            sessionData.refreshToken,
          );
          setAuthState({
            accessToken: sessionData.accessToken,
            refreshToken: sessionData.refreshToken,
            authenticated: true,
            user: sessionData.user,
          });
        } else {
          await forceLogout();
        }
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
      const sessionData = response.data as AuthSessionData | undefined;
      if (!response.success || !sessionData) {
        Alert.alert(
          "Sign up error",
          response.message || "Unknown error occured during sign up",
        );
        return;
      }
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, sessionData.accessToken);
      await SecureStore.setItemAsync(
        REFRESH_TOKEN_KEY,
        sessionData.refreshToken,
      );
      setAuthState({
        accessToken: sessionData.accessToken,
        refreshToken: sessionData.refreshToken,
        authenticated: true,
        user: sessionData.user,
      });
    } catch {
      Alert.alert("Sign up error", "Unknown error occured during sign up");
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const response = await loginUser(credentials);
      const sessionData = response.data as AuthSessionData | undefined;
      if (!response.success || !sessionData) {
        const message =
          response.message || "Unknown error occured during sign in";
        Alert.alert("Sign in error", message);
        return;
      }
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, sessionData.accessToken);
      await SecureStore.setItemAsync(
        REFRESH_TOKEN_KEY,
        sessionData.refreshToken,
      );
      setAuthState({
        accessToken: sessionData.accessToken,
        refreshToken: sessionData.refreshToken,
        authenticated: true,
        user: sessionData.user,
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
