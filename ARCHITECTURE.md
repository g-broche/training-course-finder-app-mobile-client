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

