import { API_BASE_URL } from '@env';
import { ApiResponse } from '../types/api-interface';
import * as FileSystem from 'expo-file-system';
import { UploadParams } from '../types/app';
import { isApiResponse } from '../utils/typeGuard';

export const buildUrl = (base: string, params?: Record<string, string | number>) => {
    const url = new URL(base, API_BASE_URL);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value.toString());
        });
    }
    return url.toString();
}

export const request = async <T>(
    url: string,
    options?: RequestInit,
    params?: Record<string, string | number>
): Promise<ApiResponse> => {
    const builtApiRequest = buildUrl(url, params);
    console.log("api call:", builtApiRequest);
    try {
        const res = await fetch(builtApiRequest, {
            headers: { 'Content-Type': 'application/json' },
            ...options,
        });

        // try to parse the response with null fallback in case of error
        const data = await res.json().catch(() => null);

        if (!res.ok) {
            // If error but api response exists then return the received response
            if (data && isApiResponse(data)) return data;

            // Otherwise, throw a generic error with status code
            throw new Error(`Request failed with status ${res.status}`);
        }

        return data as ApiResponse;
    } catch (error: any) {
        // For unexpected errors unrelated to strictly API create API response to be handled by the caller
        console.error(error);
        return {
            success: false,
            message: error.message || 'Unknown error occurred',
        } as ApiResponse;
    }
}

export async function uploadMultipart({
    url,
    image,
    fields,
    token,
    fieldName = 'image',
}: UploadParams): Promise<FileSystem.FileSystemUploadResult> {
    return await FileSystem.uploadAsync(url, image.uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName,
        parameters: fields,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
}
