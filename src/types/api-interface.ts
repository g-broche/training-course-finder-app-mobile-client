import { Data } from "./type";

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