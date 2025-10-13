# Weather API

This repository contains an ASP.NET Core 8.0 Web API project named **OpenWeatherApi** together with a React single-page application (**openweather-ui**) built on top of the Berry Admin template. The web UI consumes the sample `WeatherForecast` endpoint exposed by the backend API.

## Getting started

### Backend API

1. Navigate to the project directory:
   ```bash
   cd OpenWeatherApi
   ```
2. Restore dependencies (requires the .NET 8 SDK):
   ```bash
   dotnet restore
   ```
3. Run the API:
   ```bash
   dotnet run
   ```
4. Open the Swagger UI in your browser at `https://localhost:7218/swagger` (or the HTTP address shown in the console output).

### Frontend (Berry Admin UI)

The React app is created with Vite. Node.js 18+ is recommended.

1. Install dependencies:
   ```bash
   cd openweather-ui
   npm install
   ```
2. Create a `.env` file (optional) to point to a custom API base URL:
   ```bash
   echo "VITE_API_BASE_URL=https://localhost:7218" > .env
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the UI in your browser at `http://localhost:5173`. The dashboard fetches weather data from the backend API and displays a Berry Admin styled experience.

## Project structure

- `Program.cs` configures services and middleware including Swagger.
- `Controllers/WeatherForecastController.cs` exposes a sample weather endpoint.
- `WeatherForecast.cs` defines the response model returned by the sample endpoint.
- `appsettings*.json` contain configuration for logging and hosting.
- `openweather-ui` hosts the React Berry Admin dashboard that visualises the weather forecast data from the API.

The project template follows the defaults provided by `dotnet new webapi` targeting .NET 8.0.
