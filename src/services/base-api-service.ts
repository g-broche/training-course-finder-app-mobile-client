import { API_BASE_URL } from '@env';
import { ApiResponse } from '../types/api-interface';
import * as FileSystem from 'expo-file-system';
import { UploadParams } from '../types/app';

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
