import { API_BASE_URL } from '@env';
import { ApiResponse } from '../types/api-interface';
import axios from 'axios';

export const buildUrl = (endpoint: string): string => {
    return `${API_BASE_URL}${endpoint}`;
}

export const request = async <T>(url: string, options?: RequestInit): Promise<ApiResponse> => {
    console.log("api call:", buildUrl(url));
    const res = await fetch(buildUrl(url), {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json() as Promise<ApiResponse>;
}

export const axiosPostRequest = async <T>(url: string, data: any): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(buildUrl(url), data, {
            headers: {
            },
            timeout: 30000,
        });

        return response.data;
    } catch (error: any) {
        // You can enhance this error handling if you use AxiosError from axios
        if (axios.isAxiosError(error)) {
            throw new Error(`Request failed: ${error.response?.status ?? 'No response'}`);
        } else {
            throw new Error('Unknown error occurred during Axios request');
        }
    }
};

export const axiosPostRequestWithMultipartForm = async <T>(url: string, data: any): Promise<ApiResponse> => {
    try {
        console.log(data);
        console.log("api call:", buildUrl(url));
        const response = await axios.post<ApiResponse>(buildUrl(url), data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Request failed: ${error.response?.status ?? 'No response'}`);
        } else {
            throw new Error('Unknown error occurred during Axios request');
        }
    }
};
