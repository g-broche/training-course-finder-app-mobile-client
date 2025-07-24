import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Credentials, SignUpData } from '../types/interface';
import { loginUser, registerUser } from '../services/authService';
import axios from 'axios';

const TOKEN_KEY = "jwt"

interface AuthState {
    state: { token: string | null; authenticated: boolean | null };
    register: (data: SignUpData) => Promise<void>;
    login: (credentials: Credentials) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);


export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<{
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
                setState({
                    token: token,
                    authenticated: true
                })
            } else {
                setState({
                    token: null,
                    authenticated: false
                })
            }
        }
        loadToken();
    }, []);

    const register = async (data: SignUpData) => {
        try {
            const receivedToken = await registerUser(data);
            setState({
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
            setState({
                token: receivedToken,
                authenticated: true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
            await SecureStore.setItemAsync(TOKEN_KEY, receivedToken)
        } catch (error) {
            console.log(error)
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('jwt');

        axios.defaults.headers.common['Authorization'] = ``;

        setState({
            token: null,
            authenticated: false
        })

    };

    return (
        <AuthContext.Provider
            value={{
                state,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
