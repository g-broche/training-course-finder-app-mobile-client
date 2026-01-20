import Constants from "expo-constants";
import { ApiResponse } from "../types/api-interface";
import { UploadParams } from "../types/app";
import { isApiResponse } from "../utils/typeGuard";

const API_BASE_URL =
  Constants.expoConfig?.extra?.API_BASE_URL || "http://10.51.163.145:8080/api";

export const buildUrl = (
  base: string,
  params?: Record<string, string | number>,
) => {
  const url = new URL(base, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }
  return url.toString();
};

export const request = async <T>(
  endpoint: string,
  options?: RequestInit,
  params?: Record<string, string | number>,
): Promise<ApiResponse> => {
  const builtApiRequest = buildUrl(endpoint, params);
  options.headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  console.log("api call:", builtApiRequest);
  try {
    const res = await fetch(builtApiRequest, {
      headers: { "Content-Type": "application/json" },
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
      message: error.message || "Unknown error occurred",
    } as ApiResponse;
  }
};

export async function uploadMultipart({
  url,
  image,
  fields,
  token,
  fieldName = "image",
}: UploadParams): Promise<ApiResponse> {
  try {
    const formData = new FormData();

    // Add the image file
    const imageFile: any = {
      uri: image.uri,
      type: image.type || "image/jpeg",
      name: "image.jpg",
    };
    formData.append(fieldName, imageFile);

    // Add all other fields
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type header - let the browser set it with boundary
      },
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (data && isApiResponse(data)) return data;
      throw new Error(`Upload failed with status ${response.status}`);
    }

    return data as ApiResponse;
  } catch (error: any) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: error.message || "Unknown error occurred during upload",
    } as ApiResponse;
  }
}
