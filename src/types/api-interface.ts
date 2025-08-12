import { ApiData } from "./type";

export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: ApiData;
}

export interface ApiSuccessResponse {
    success: true;
    message?: string;
    data?: ApiData;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    data?: ApiData;
}