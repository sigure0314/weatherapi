# Copilot Instructions for weatherapi

## Overview
This repository contains two main components:
- **OpenWeatherApi**: ASP.NET Core 8.0 Web API backend (C#)
- **openweather-ui**: React (Vite) frontend using the Berry Admin template

The frontend fetches weather forecast data from the backend's `/weatherforecast` endpoint and displays it in a dashboard.

---

## Key Architecture & Patterns

### Backend (OpenWeatherApi)
- Entry: `Program.cs` configures services, CORS (for Vite dev and Codespaces), Swagger, and controller routing.
- Main endpoint: `Controllers/WeatherForecastController.cs` exposes a sample GET `/weatherforecast` returning 5 days of random weather data.
- Data model: `WeatherForecast.cs` defines the response shape.
- CORS policy: Only allows requests from Vite dev server and Codespaces preview URLs.
- Swagger UI: Enabled in development for API exploration.
- Config: `appsettings*.json` for environment-specific settings.

### Frontend (openweather-ui)
- Entry: `src/main.jsx` bootstraps the React app.
- API config: `src/config.js` reads `VITE_API_BASE_URL` (from `.env` or defaults to Codespaces preview URL).
- API client: `src/utils/apiClient.js` wraps fetch for backend calls.
- Data fetching: `src/hooks/useWeatherForecast.js` loads and parses weather data, computes metrics (average, min, max temperature).
- UI: `src/components/WeatherDashboard.jsx` displays metrics and forecast, handles loading/error states.
- Styling: Uses Berry Admin theme (`src/theme/`).

---

## Developer Workflows

### Backend
- **Restore & run:**
  ```bash
  cd OpenWeatherApi
  dotnet restore
  dotnet run
  ```
- **Swagger UI:**
  Visit the URL shown in the console (usually `https://localhost:7218/swagger`).
- **CORS:**
  If changing frontend dev URLs, update the `origins` array in `Program.cs`.

### Frontend
- **Install & run:**
  ```bash
  cd openweather-ui
  npm install
  npm run dev
  ```
- **API base URL:**
  Set `VITE_API_BASE_URL` in `.env` if backend is not on default Codespaces port.
- **Lint:**
  `npm run lint`

---

## Project Conventions
- **Backend:**
  - Controllers in `Controllers/`
  - Models in root or `Models/`
  - Minimal API, no database or authentication by default
- **Frontend:**
  - All API calls via `apiClient.js`
  - Data fetching logic in hooks (e.g., `useWeatherForecast.js`)
  - Berry Admin theme for UI consistency

---

## Integration Points
- **Frontend ↔ Backend:**
  - All data flows through `/weatherforecast` endpoint
  - CORS must allow frontend dev origin
- **Environment config:**
  - `.env` in frontend, `appsettings*.json` in backend

---

## References
- [README.md](../README.md) for setup
- [openweather-ui/README.md](../openweather-ui/README.md) for frontend scripts
- [Program.cs](../OpenWeatherApi/Program.cs) for backend config
- [WeatherForecastController.cs](../OpenWeatherApi/Controllers/WeatherForecastController.cs) for API logic

---

**For AI agents:**
- Use the above conventions for new endpoints, UI features, or integration.
- Keep CORS and API base URLs in sync when adding new features.
- Follow the Berry Admin UI style for new components.
