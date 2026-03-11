# Finder App - Mobile App

## Presentation

This repo is related to a training course brief involving creating an App intended to let users post announces for lost and found items. The brief itself is based on three components :

Headless API : Providing authentification and data crud, the chosen stack for this part is Spring Boot and Postgresql inside docker containers.
Client : App the users will be interacting with for the intended features. Will be made using React Native.
Back office : Interface restricted to admin only and mainly intended for moderation purpose. Will be made with Angular.

This repo covers the subproject related to the mobile client intended for all users to interact with the available features.

## Documentation

- [Architecture](./docs/architecture.md)
- [Expo Go (development mode)](./docs/expo-go-dev-mode.md)
- [Authentication](./docs/authentication.md)
- [Deployment with EAS](./docs/deploy.md)

## Quick start

```bash
npm.cmd install
npm.cmd run start
```

Then scan the Expo QR code with Expo Go.
