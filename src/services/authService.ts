import { jwtDecode } from "jwt-decode";
import { Credentials, SignUpData, User } from "../types/interface";
import { request } from "./base-api-service";
import * as SecureStore from 'expo-secure-store';

const ENDPOINTS = {
    register: '/auth/signup',
    login: '/auth/signin'
}

export const registerUser = async (payload: SignUpData) => {
    console.log("request :", JSON.stringify(payload))
    const response = await request(ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    console.log("got response")
    if (!response.success) {
        console.log("Error response : " + response.message);
    }
    const token = await response.data.jwt;
    console.log("token received : " + token)
    await SecureStore.setItemAsync('jwt', token);
}

export const loginUser = async (credentials: Credentials) => {
    return request(ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export const getToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('jwt');
};

export const getUserFromToken = async (): Promise<User | null> => {
    const token = await getToken();
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        const user: User = {
            uuid: decoded.uuid,
            email: decoded.sub, // JWT subject = email
            roles: decoded.roles,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            displayName: decoded.displayName,
            isVerified: decoded.isVerified,
            hasAcceptedGdpr: decoded.hasAcceptedGdpr,
            userCreatedAt: new Date(decoded.userCreatedAt),
        };
        return user;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};