import { API_BASE_URL } from '@env';
import { ApiResponse } from '../types/interface';

export const buildUrl = (endpoint: string): string => {
    console.log("base url :" + API_BASE_URL);
    console.log(`${API_BASE_URL}${endpoint}`);
    return `${API_BASE_URL}${endpoint}`;
}

export const request = async <T>(url: string, options?: RequestInit): Promise<ApiResponse> => {
    const res = await fetch(buildUrl(url), {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json() as Promise<ApiResponse>;
}