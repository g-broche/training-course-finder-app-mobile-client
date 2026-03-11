# Authentication

This document explains how authentication works in the Finder mobile client.

## Overview

Authentication is implemented with:

- `src/context/AuthContext.tsx` for auth state and session lifecycle
- `src/services/authService.ts` for auth API calls
- `src/services/base-api-service.ts` for token injection, refresh and retry
- `expo-secure-store` for token persistence on device

## Stored tokens

Two tokens are persisted in secure storage:

- `accessToken`
- `refreshToken`

On app startup, `AuthContext` loads both tokens and sets `authenticated` state.

## Auth endpoints

Defined in `src/services/authService.ts`:

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signoff`
- `POST /api/auth/refresh`

Display name availability check:

- `GET /api/users/displayName/available`

## Login and registration flow

1. Form submits credentials or sign-up data
2. `AuthContext` calls `loginUser` or `registerUser`
3. On success, access and refresh tokens are saved in SecureStore
4. User info is decoded from JWT (`getUserFromToken`)
5. `authState` is updated with `authenticated: true`

## Authorized requests

The shared `request` function in `base-api-service.ts`:

1. Reads current access token from registered token handlers
2. Adds `Authorization: Bearer <token>` when present
3. Executes request

This keeps feature services simple and consistent.

## Token refresh behavior

When a request returns `401` and a refresh token is available:

1. A refresh request is sent to `/api/auth/refresh`
2. Concurrent failed requests are queued while refresh is in progress
3. If refresh succeeds:
   - new tokens are stored
   - queued requests are retried with the new access token
4. If refresh fails:
   - queued requests are rejected
   - global auth failure handler is called
   - user is forced to logout

## Logout behavior

Manual logout:

- Calls `POST /api/auth/signoff`
- Clears tokens from secure storage
- Resets axios default auth header
- Clears user/session state
- Clears React Query cache
- Redirects to `/`

Forced logout (refresh failure) follows the same local cleanup path.

## User object from JWT

`getUserFromToken` decodes JWT claims into a typed `LoggedUser` object including:

- `uuid`, `email`, `roles`
- `firstName`, `lastName`, `displayName`
- verification and GDPR flags
- account creation date

If token decode fails, it returns `null`.
