# Deploying this Expo React Native app with EAS

This guide covers the end-to-end steps to deploy an Expo app using **EAS Build**, **EAS Submit**, and optional **EAS Update**.

> Project context: Expo app in this repository (`client2/`) with Android native folder present.

---

## 1) Prerequisites

1. **Node.js + npm/yarn** installed.
2. **Expo account** (free): https://expo.dev/signup
3. **EAS CLI** installed globally:
   ```bash
   npm install -g eas-cli
   ```
4. **Log in to Expo**:
   ```bash
   eas login
   ```
5. **Store accounts** (for production releases):
   - Apple Developer Program: https://developer.apple.com/programs/
   - Google Play Console: https://play.google.com/console/about/

Sources:
- EAS Build intro: https://docs.expo.dev/build/introduction/
- EAS CLI setup: https://docs.expo.dev/build/setup/

---

## 2) Prepare app metadata and config

Before building, verify these fields in `app.json` (or app config):

- `expo.name`
- `expo.slug`
- `expo.version`
- `expo.android.package` (must be unique, e.g. `com.yourcompany.finder`)
- `expo.ios.bundleIdentifier` (must be unique, e.g. `com.yourcompany.finder`)
- platform permissions/icons/splash as needed

If iOS is planned, ensure the app has a valid iOS bundle identifier.

Sources:
- App config reference: https://docs.expo.dev/versions/latest/config/app/

---

## 3) Initialize EAS in the project

From project root:

```bash
eas init
```

Then generate build profiles:

```bash
eas build:configure
```

This creates/updates `eas.json`.

Source:
- Configure EAS Build: https://docs.expo.dev/build/setup/

---

## 4) Define build profiles in `eas.json`

A common minimal setup:

- `development` for dev client testing
- `preview` for internal QA distribution
- `production` for store-ready binaries

Example commands by profile:

```bash
# Android

eas build --platform android --profile preview
eas build --platform android --profile production

# iOS

eas build --platform ios --profile preview
eas build --platform ios --profile production
```

Useful references:
- Build profiles (`eas.json`): https://docs.expo.dev/build/eas-json/
- Android APK vs AAB: https://docs.expo.dev/build-reference/apk/

---

## 5) Handle credentials/signing

During first build, EAS can manage credentials for you (recommended for most teams).

- Android keystore management via EAS
- iOS certificates/provisioning profiles via EAS + Apple account

Command for credential management:

```bash
eas credentials
```

Sources:
- App credentials: https://docs.expo.dev/app-signing/app-credentials/
- iOS credentials flow: https://docs.expo.dev/app-signing/local-credentials/#ios-credentials

---

## 6) Create release builds

### Android
For Play Store, build **AAB**:

```bash
eas build --platform android --profile production
```

### iOS
For App Store/TestFlight:

```bash
eas build --platform ios --profile production
```

Track builds in dashboard:
- https://expo.dev/accounts/[account]/projects/[project]/builds

Sources:
- Build for Android/iOS: https://docs.expo.dev/build/introduction/

---

## 7) Submit to stores (optional but typical)

After successful production build:

```bash
# Android -> Google Play

eas submit --platform android --profile production

# iOS -> App Store Connect

eas submit --platform ios --profile production
```

You can also submit manually using artifacts from EAS Build.

Sources:
- EAS Submit intro: https://docs.expo.dev/submit/introduction/
- Submit Android: https://docs.expo.dev/submit/android/
- Submit iOS: https://docs.expo.dev/submit/ios/

---

## 8) Internal testing distribution (QA)

For sharing builds with testers before store release:

- Build with `preview` profile
- Enable internal distribution in profile if needed
- Share generated install link/QR from Expo dashboard

Source:
- Internal distribution: https://docs.expo.dev/build/internal-distribution/

---

## 9) OTA JavaScript updates (post-release)

If you want to push JS/asset updates without rebuilding native binaries:

1. Configure channels/branches for update strategy.
2. Publish updates:
   ```bash
   eas update --branch production --message "Fix filtering bug"
   ```

Important: Native code changes still require a new build.

Sources:
- EAS Update getting started: https://docs.expo.dev/eas-update/getting-started/
- Deploy updates: https://docs.expo.dev/deploy/send-over-the-air-updates/

---

## 10) CI/CD automation (recommended)

Automate build/submit with GitHub Actions or other CI.

Source:
- Automate EAS workflows: https://docs.expo.dev/build/building-on-ci/

---

## 11) Practical release checklist

Before production submission:

- [ ] `expo.version` bumped
- [ ] Android `versionCode` incremented
- [ ] iOS `buildNumber` incremented
- [ ] Release notes prepared
- [ ] Tested on physical devices
- [ ] Store metadata/screenshots updated
- [ ] Privacy/permissions descriptions validated

References:
- Versioning guide: https://docs.expo.dev/build-reference/app-versions/
- App store deployment overview: https://docs.expo.dev/distribution/app-stores/

---

## Suggested first run for this repository

From `client2/`:

```bash
npm install
npx expo-doctor
eas login
eas init
eas build:configure
eas build --platform android --profile preview
```

Then test the preview build on a real Android device, fix issues, and proceed to production profile + submit.
