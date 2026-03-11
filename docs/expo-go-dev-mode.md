# Running in Expo Go (development mode)

This guide explains how to run the Finder mobile app locally with Expo Go.

## Prerequisites

- Node.js installed
- npm installed
- Expo Go installed on your phone
- Phone and computer on the same local network

## Install dependencies

From the project root (`client2/`):

```bash
npm.cmd install
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

## Start the development server

```bash
npm.cmd run start
```

This runs `expo start` and shows a QR code in the terminal.

## Open the app in Expo Go

1. Open Expo Go on your phone
2. Scan the QR code shown by Expo
3. Wait for Metro to bundle and load the app

## Useful run commands

```bash
npm.cmd run android   # Runs app on Android emulator/device with native project
npm.cmd run ios       # Runs app on iOS simulator/device (macOS only)
npm.cmd run web       # Runs web target in browser
npm.cmd run lint      # Lint the project
```

## Local API configuration

The mobile app reads API settings from `app.json`:

- `expo.extra.API_BASE_URL`

Current value points to a local-network host (example: `http://10.x.x.x:8080/api`).

If your backend is not reachable from your phone:

1. Ensure backend server is running
2. Ensure your phone can reach your computer over LAN
3. Update `API_BASE_URL` to the reachable host IP and port
4. Restart Expo after config changes

## Troubleshooting

- QR code opens but app cannot fetch data:
  - Check `API_BASE_URL` host and backend status
  - Check firewall rules on your computer
- Expo Go cannot connect to Metro:
  - Verify phone and computer are on the same Wi-Fi
  - Restart with `npm.cmd run start`
- Stale cache issues:
  - Restart Expo with cache clear: `npx expo start -c`
