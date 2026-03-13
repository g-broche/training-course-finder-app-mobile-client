import { ApiResponse } from "../types/api-interface";
import { LoggedUser } from "../types/dto";
import { Credentials, SignUpData } from "../types/request";
import { request } from "./base-api-service";

export interface AuthSessionData {
  accessToken: string;
  refreshToken: string;
  user: LoggedUser;
}

const ENDPOINTS = {
  register: "/api/auth/signup",
  login: "/api/auth/signin",
  logout: "/api/auth/signoff",
  refresh: "/api/auth/refresh",
  currentUser: "/api/auth/me",
  displayNameAvailability: "/api/users/displayName/available",
};

export const registerUser = async (
  payload: SignUpData,
): Promise<ApiResponse> => {
  return await request(ENDPOINTS.register, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (
  credentials: Credentials,
): Promise<ApiResponse> => {
  return await request(ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const logoutUser = async (
  refreshToken: string,
): Promise<ApiResponse> => {
  return await request(ENDPOINTS.logout, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<ApiResponse> => {
  return await request(ENDPOINTS.refresh, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
};

export const getCurrentUser = async (
  accessToken?: string,
): Promise<ApiResponse> => {
  const headers = new Headers();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return await request(ENDPOINTS.currentUser, {
    method: "GET",
    headers,
  });
};

/**
 * Check if a display name is available
 * @param displayName - The display name to check
 * @returns Promise<boolean> - true if available, false if taken
 */
export const checkDisplayNameAvailability = async (
  displayName: string,
): Promise<boolean> => {
  try {
    const response = await request(
      ENDPOINTS.displayNameAvailability,
      {
        method: "GET",
      },
      { displayName },
    );

    if (response.success && response.data !== undefined) {
      return response.data as boolean;
    }

    return false;
  } catch (error) {
    console.error("Failed to check display name availability:", error);
    return false;
  }
};
