import { jwtDecode } from "jwt-decode";
import { request } from "./base-api-service";
import * as SecureStore from 'expo-secure-store';
import { Credentials, SignUpData } from "../types/request";
import { LoggedUser } from "../types/dto";
import { ApiResponse } from "../types/api-interface";

const ENDPOINTS = {
    register: '/api/auth/signup',
    login: '/api/auth/signin'
}

export const registerUser = async (payload: SignUpData): Promise<ApiResponse> => {
    return await request(ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export const loginUser = async (credentials: Credentials): Promise<ApiResponse> => {
    return await request(ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export const getUserFromToken = (token: string): LoggedUser | null => {
    if (token === undefined || token === null || token.length === 0) return null;

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