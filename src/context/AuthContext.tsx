import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Credentials, SignUpData } from '../types/interface';
import { loginUser, registerUser } from '../services/authService';
import axios from 'axios';


interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
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
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log('stored token:', token)

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }

        // loadToken();
    });

    const register = async (data: SignUpData) => {
        try {
            const receivedToken = await registerUser(data);
            setAuthState({
                token: receivedToken,
                authenticated: true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
            await SecureStore.setItemAsync(TOKEN_KEY, receivedToken)
        } catch (error) {
            console.log(error)
        }
    };

    const login = async (credentials: Credentials) => {
        try {
            const receivedToken = await loginUser(credentials);
            setAuthState({
                token: receivedToken,
                authenticated: true
            })
        } catch (error) {
            console.log(error)
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('jwt');

        axios.defaults.headers.common['Authorization'] = ``;

        setAuthState({
            token: null,
            authenticated: false
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
