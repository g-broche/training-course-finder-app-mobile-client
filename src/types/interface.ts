import { Data } from "./type";

export interface RouteDefinition {
    title: string;
    pathname: string; // e.g. "/announces/[id]/discussion/[discussionId]"
    params: Record<string, string>; // { id: '123', discussionId: '456' }
}

export interface SignUpData {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    hasAcceptedGdpr: boolean;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: Data;
}

export interface ApiSuccessResponse {
    success: true;
    message?: string;
    data?: Data;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    data?: Data;
}

export interface User {
    uuid: string,
    email: string,
    roles: string[],
    firstName: string,
    lastName: string,
    displayName: string,
    isVerified: boolean,
    hasAcceptedGdpr: boolean,
    userCreatedAt: Date,
};