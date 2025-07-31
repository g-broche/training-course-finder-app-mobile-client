import { jwtDecode } from "jwt-decode";
import { request } from "./base-api-service";
import * as SecureStore from 'expo-secure-store';
import { Credentials, SignUpData } from "../types/request";
import { LoggedUser } from "../types/dto";

const ENDPOINTS = {
    register: '/auth/signup',
    login: '/auth/signin'
}

export const registerUser = async (payload: SignUpData) => {
    const response = await request(ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (!response.success) {
        console.log(`Error : ${response.message || "an unexpected error occured during signup"}`);
    }
    return await response.data.jwt;

}

export const loginUser = async (credentials: Credentials) => {
    const response = await request(ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
    if (!response.success) {
        console.log(`Error : ${response.message || "an unexpected error occured during signin"}`);
    }
    return await response.data.jwt;
}

export const getToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('jwt');
};

export const getUserFromToken = async (): Promise<LoggedUser | null> => {
    const token = await getToken();
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        const user: LoggedUser = {
            uuid: decoded.uuid,
            email: decoded.sub,
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