# React Native Movie App

A cross-platform mobile movie discovery app built with Expo and React Native. The app lets users browse popular movies, search titles in real time, open detailed movie pages, and surface trending searches based on user activity.

## Overview

This project combines:

- TMDB (The Movie Database) for movie content
- Appwrite TablesDB for tracking search analytics
- Expo Router for file-based navigation
- NativeWind (Tailwind for React Native) for styling

## Features

- Browse latest/popular movies on the Home tab
- Horizontal trending movie rail based on most searched movies
- Search screen for real-time title lookup with debounce
- Movie details page with key metadata and summary

## Tech Stack

- Framework: Expo + React Native
- Language: TypeScript
- Routing: Expo Router
- Styling: NativeWind + Tailwind CSS
- Backend services:
    - TMDB API for movie data
    - Appwrite TablesDB for search metrics/trending
- Tooling: ESLint (Expo config)

## Project Structure

```text
app/
	_layout.tsx            # Root stack navigator
	(tabs)/
		_layout.tsx          # Bottom tabs configuration
		index.tsx            # Home screen
		search.tsx           # Search screen
		saved.tsx            # Saved placeholder
		profile.tsx          # Profile placeholder
	movies/
		[id].tsx             # Movie details screen

components/
	MovieCard.tsx
	SearchBar.tsx
	TrendingCard.tsx

services/
	api.ts                 # TMDB fetch helpers
	appwrite.ts            # Appwrite metrics + details helpers
	useFetch.ts            # Generic fetch hook

constants/
	icons.ts
	images.ts
```

## Environment Variables

Create a `.env` file in the project root and add:

```bash
EXPO_PUBLIC_IMDB_ACCESS_TOKEN=your_tmdb_bearer_token

EXPO_PUBLIC_APPWRITE_ENDPOINT=https://<your-appwrite-endpoint>/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_METRICS_TABLE=your_metrics_table_id
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

- Add the `.env` file as shown above.

### 3. Start the development server

```bash
npx expo start
```

Then run on your preferred target:

- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## Available Scripts

- `npm run start` - Start Expo dev server
- `npm run android` - Open app on Android
- `npm run ios` - Open app on iOS
- `npm run web` - Run web build via Expo
- `npm run lint` - Run lint checks

## Future Improvements

- Implement real Saved movies functionality
- Add user authentication/profile management
- Add pagination and pull-to-refresh on listing screens
- Improve error states and offline handling
- Add automated tests for hooks and service layer
