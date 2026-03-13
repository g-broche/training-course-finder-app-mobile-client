import Constants from "expo-constants";
import { ApiResponse } from "../types/api-interface";
import { LoggedUser } from "../types/dto";
import { isApiResponse } from "../utils/typeGuard";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

// Token management for refresh logic
let tokenGetter:
  | (() => { accessToken: string | null; refreshToken: string | null })
  | null = null;
let tokenSetter:
  | ((
      accessToken: string,
      refreshToken: string,
      user?: LoggedUser,
    ) => Promise<void>)
  | null = null;
// Forced logout on failed refresh
let authRefreshFailureHandler: (() => Promise<void> | void) | null = null;
// Queue to hold failed requests during token refresh
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];
// Flags to prevent multiple simultaneous refresh attempts
let isHandlingAuthRefreshFailure = false;
let isRefreshing = false;

// Function to set token handlers, called from AuthContext
export const setTokenHandlers = (
  getter: () => { accessToken: string | null; refreshToken: string | null },
  setter: (
    accessToken: string,
    refreshToken: string,
    user?: LoggedUser,
  ) => Promise<void>,
) => {
  tokenGetter = getter;
  tokenSetter = setter;
};
// get the Forced logout logic from AuthContext for handling refresh failure
export const setAuthRefreshFailureHandler = (
  handler: (() => Promise<void> | void) | null,
) => {
  authRefreshFailureHandler = handler;
};

// Helper to process the queue of failed requests after token refresh attempt
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

// Handle actions on refresh failure, ensuring only one handler runs at a time
const handleAuthRefreshFailure = async () => {
  if (!authRefreshFailureHandler || isHandlingAuthRefreshFailure) {
    return;
  }
  isHandlingAuthRefreshFailure = true;
  try {
    await authRefreshFailureHandler();
  } finally {
    isHandlingAuthRefreshFailure = false;
  }
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
  isMultipart: boolean = false,
): Promise<ApiResponse> => {
  const builtApiRequest = buildUrl(endpoint, params);

  // Get the current access token
  const tokens = tokenGetter
    ? tokenGetter()
    : { accessToken: null, refreshToken: null };
  const { accessToken } = tokens;

  // Build headers with access token if available and let fetch set
  // Content-Type if multipart is true for correct boundary handling
  const headers = new Headers(options?.headers);
  if (!isMultipart && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
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
            const retryHeaders = new Headers(headers);
            retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
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
          refreshData.data?.refreshToken &&
          refreshData.data?.user
        ) {
          const newAccessToken = refreshData.data.accessToken;
          const newRefreshToken = refreshData.data.refreshToken;
          const refreshedUser = refreshData.data.user as LoggedUser;

          // Update tokens and process the queue of failed requests
          await tokenSetter(newAccessToken, newRefreshToken, refreshedUser);
          processQueue(null, newAccessToken);
          // Retry original request with new token
          const retryHeaders = new Headers(headers);
          retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
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
          await handleAuthRefreshFailure();
          return {
            success: false,
            message: "Failed to refresh session. Please login again.",
          } as ApiResponse;
        }
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        await handleAuthRefreshFailure();
        return {
          success: false,
          message: "Failed to refresh session. Please login again.",
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
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    } as ApiResponse;
  }
};
