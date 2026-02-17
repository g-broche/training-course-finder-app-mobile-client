import Constants from "expo-constants";
import { ApiResponse } from "../types/api-interface";
import { UploadParams } from "../types/app";
import { isApiResponse } from "../utils/typeGuard";

const API_BASE_URL =
  Constants.expoConfig?.extra?.API_BASE_URL || "http://10.51.163.145:8080/api";

// Token management for refresh logic
let tokenGetter:
  | (() => { accessToken: string | null; refreshToken: string | null })
  | null = null;
let tokenSetter:
  | ((accessToken: string, refreshToken: string) => Promise<void>)
  | null = null;
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setTokenHandlers = (
  getter: () => { accessToken: string | null; refreshToken: string | null },
  setter: (accessToken: string, refreshToken: string) => Promise<void>,
) => {
  tokenGetter = getter;
  tokenSetter = setter;
};

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

export const request = async (
  endpoint: string,
  options?: RequestInit,
  params?: Record<string, string | number>,
): Promise<ApiResponse> => {
  const builtApiRequest = buildUrl(endpoint, params);

  // Get the current access token
  const tokens = tokenGetter
    ? tokenGetter()
    : { accessToken: null, refreshToken: null };
  const { accessToken } = tokens;

  // Build headers with access token if available
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  options = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(builtApiRequest, options);
    const data = await res.json().catch(() => null);

    // Handle 401 Unauthorized - attempt token refresh
    if (res.status === 401 && tokens.refreshToken && tokenSetter) {
      if (isRefreshing) {
        // Wait for the ongoing refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newAccessToken) => {
            // Retry the request with new token
            const retryHeaders = {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            return fetch(builtApiRequest, {
              ...options,
              headers: retryHeaders,
            }).then(async (retryRes) => {
              const retryData = await retryRes.json().catch(() => null);
              if (!retryRes.ok) {
                if (retryData && isApiResponse(retryData)) return retryData;
                throw new Error(
                  `Request failed with status ${retryRes.status}`,
                );
              }
              return retryData as ApiResponse;
            });
          })
          .catch((err) => {
            return {
              success: false,
              message: err.message || "Authentication failed",
            } as ApiResponse;
          });
      }

      // Start refresh process
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(buildUrl("/api/auth/refresh"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: tokens.refreshToken }),
        });

        const refreshData = await refreshResponse.json().catch(() => null);
        if (
          refreshResponse.ok &&
          refreshData?.success &&
          refreshData.data?.accessToken &&
          refreshData.data?.refreshToken
        ) {
          const newAccessToken = refreshData.data.accessToken;
          const newRefreshToken = refreshData.data.refreshToken;

          // Update tokens
          await tokenSetter(newAccessToken, newRefreshToken);
          processQueue(null, newAccessToken);

          // Retry original request with new token
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          const retryRes = await fetch(builtApiRequest, {
            ...options,
            headers: retryHeaders,
          });
          const retryData = await retryRes.json().catch(() => null);
          if (!retryRes.ok) {
            if (retryData && isApiResponse(retryData)) return retryData;
            throw new Error(`Request failed with status ${retryRes.status}`);
          }

          return retryData as ApiResponse;
        } else {
          processQueue(new Error("Token refresh failed"), null);
          return {
            success: false,
            message: "Session expired. Please login again.",
          } as ApiResponse;
        }
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        return {
          success: false,
          message: "Session expired. Please login again.",
        } as ApiResponse;
      } finally {
        isRefreshing = false;
      }
    }

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
    // Get the current access token if not provided
    const authToken = token || (tokenGetter ? tokenGetter().accessToken : null);

    const formData = new FormData();

    // Add the image file if present
    if (image) {
      const imageFile: any = {
        uri: image.uri,
        type: image.type || "image/jpeg",
        name: "image.jpg",
      };
      formData.append(fieldName, imageFile);
    }

    // Add all other fields
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const headers: HeadersInit = {};
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json().catch(() => null);

    // Handle 401 Unauthorized - attempt token refresh
    if (response.status === 401 && tokenGetter && tokenSetter) {
      const tokens = tokenGetter();

      if (tokens.refreshToken) {
        try {
          const refreshResponse = await fetch(buildUrl("/api/auth/refresh"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
          });

          const refreshData = await refreshResponse.json().catch(() => null);

          if (
            refreshResponse.ok &&
            refreshData?.success &&
            refreshData.data?.accessToken &&
            refreshData.data?.refreshToken
          ) {
            const newAccessToken = refreshData.data.accessToken;
            const newRefreshToken = refreshData.data.refreshToken;

            // Update tokens
            await tokenSetter(newAccessToken, newRefreshToken);

            // Retry upload with new token
            const retryHeaders: HeadersInit = {
              Authorization: `Bearer ${newAccessToken}`,
            };

            const retryResponse = await fetch(url, {
              method: "POST",
              headers: retryHeaders,
              body: formData,
            });

            const retryData = await retryResponse.json().catch(() => null);

            if (!retryResponse.ok) {
              if (retryData && isApiResponse(retryData)) return retryData;
              throw new Error(
                `Upload failed with status ${retryResponse.status}`,
              );
            }

            return retryData as ApiResponse;
          }
        } catch {
          return {
            success: false,
            message: "Session expired. Please login again.",
          } as ApiResponse;
        }
      }
    }

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
