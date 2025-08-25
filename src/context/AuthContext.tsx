import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getUserFromToken, loginUser, registerUser } from '../services/authService';
import axios from 'axios';
import { Credentials, SignUpData } from '../types/request';
import { LoggedUser } from '../types/dto';

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
};

const TOKEN_KEY = "jwt"
const AuthContext = createContext<AuthProps>({});


export const useAuth = () => {
    return useContext(AuthContext);;
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        authenticated: null,
        user: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
        }

        loadToken();
    }, []);

    const register = async (data: SignUpData) => {
        try {
            const receivedToken = await registerUser(data);
            if (!receivedToken) { return; }
            await SecureStore.setItemAsync(TOKEN_KEY, receivedToken)
            const loggedUser = getUserFromToken(receivedToken);
            setAuthState({
                token: receivedToken,
                authenticated: true,
                user: loggedUser
            });
        } catch (error) {
            console.log(error)
        }
    };

    const login = async (credentials: Credentials) => {
        try {
            const receivedToken = await loginUser(credentials);
            if (!receivedToken) { return; }
            await SecureStore.setItemAsync(TOKEN_KEY, receivedToken)
            const loggedUser = getUserFromToken(receivedToken);
            setAuthState({
                token: receivedToken,
                authenticated: true,
                user: loggedUser
            });
        } catch (error) {
            console.log(error)
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({
            token: null,
            authenticated: false,
            user: null
        })

    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
