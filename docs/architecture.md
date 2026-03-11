# Project architecture

This document describes the high-level architecture of the Finder mobile client built with Expo and React Native.

## Tech stack

- Expo + React Native
- Expo Router (file-based routing)
- TanStack Query for server-state and cache
- React Context for authentication state
- TypeScript for typing

## Main folders

```text
app/                 # Navigation and screens via Expo Router
src/components/      # UI components (announces, forms, discussions, shared)
src/context/         # React contexts (AuthContext)
src/core/            # Core configuration (query client)
src/hooks/           # Data and UI custom hooks
src/services/        # API communication layer
src/styles/          # Theme constants and style objects
src/types/           # Shared TypeScript types and DTOs
src/utils/           # Generic utility helpers
docs/                # Project documentation
```

## Detailed infrastructure

```text
client-mobile/
├── app/                              # Expo Router app directory (file-based routing)
│   ├── _layout.tsx                   # Root layout with providers (Auth, QueryClient)
│   └── (tabs)/                       # Tab navigation group
│       ├── _layout.tsx               # Tab layout configuration
│       ├── index.tsx                 # Home screen
│       └── announces/                # Announce-related screens
│           ├── found/                # Found items announce screens
│           └── lost/                 # Lost items announce screens
│
├── src/                              # Source code
│   ├── components/                   # Reusable UI components
│   │   ├── announces/                # Announce-specific components
│   │   ├── discussions/              # Discussion/messaging components
│   │   ├── forms/                    # Form components
│   │   ├── header/                   # Header components
│   │   ├── shared/                   # Shared/common components
│   │   │   ├── buttons/
│   │   │   ├── app-menu/
│   │   │   ├── dropdown/
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-state.tsx
│   │   │   ├── error-text.tsx
│   │   │   ├── loader-state.tsx
│   │   │   ├── paginator.tsx
│   │   │   └── view-title.tsx
│   │   ├── custom-drawer-content.tsx
│   │   └── map-display.tsx
│   │
│   ├── context/                      # React Context providers
│   │   └── AuthContext.tsx           # Authentication context & provider
│   │
│   ├── core/                         # Core configuration
│   │   └── queryClient.ts            # TanStack Query client configuration
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── announce/                 # Announce-related hooks
│   │   └── discussion/               # Discussion-related hooks
│   │
│   ├── services/                     # API service layer
│   │
│   ├── styles/                       # Style definitions
│   │
│   ├── types/                        # TypeScript type definitions
│   │
│   └── utils/                        # Utility functions
│
├── assets/                           # Static assets
│   └── images/                       # Images and icons
│
├── android/                          # Android native project
│
├── app.json                          # Expo configuration
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── babel.config.js                   # Babel configuration
├── eslint.config.js                  # ESLint configuration
└── README.md                         # Project documentation
```

## App composition

The root layout is defined in `app/_layout.tsx`.

It composes global providers in this order:

1. `AuthProvider` for session and user state
2. `QueryClientProvider` for React Query cache/networking
3. `Drawer` with tab screens as the main navigation shell

This design keeps global concerns centralized and makes feature screens mostly focused on UI and feature logic.

## Data flow

Typical data flow in this app:

1. A screen or component calls a custom hook from `src/hooks/`
2. The hook uses service functions from `src/services/`
3. Services call the shared request helper in `src/services/base-api-service.ts`
4. The request helper builds URLs from Expo config and handles auth headers
5. The API response is returned to the hook/component
6. UI is updated and optionally cached by React Query

## API layer responsibilities

`src/services/base-api-service.ts` centralizes:

- API base URL usage from `app.json` (`expo.extra.API_BASE_URL`)
- Standard request headers
- Access token injection in request headers
- Automatic token refresh on `401`
- Failed request queueing while refresh is in progress
- Global logout trigger if refresh fails

This avoids duplicating networking/auth logic in each feature service.

## Feature boundaries

- Announce features: `src/components/announces/`, `src/hooks/announce/`, `src/services/announceService.ts`
- Discussion features: `src/components/discussions/`, `src/hooks/discussion/`, `src/services/discussionService.ts`
- User/auth features: `src/components/forms/`, `src/hooks/user/`, `src/context/AuthContext.tsx`, `src/services/authService.ts`

## Authentication boundary

Auth is managed by the `AuthContext` + API service layer.

- `AuthContext` owns in-memory auth state + secure token persistence
- `authService.ts` defines auth endpoints and token decoding
- `base-api-service.ts` handles refresh and retry mechanics

See `docs/authentication.md` for full details.
