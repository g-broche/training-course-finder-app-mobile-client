import { API_BASE_URL } from '@env';
import { ApiResponse } from '../types/api-interface';
import * as FileSystem from 'expo-file-system';
import { UploadParams } from '../types/app';

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
    const res = await fetch(builtApiRequest, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json() as Promise<ApiResponse>;
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
