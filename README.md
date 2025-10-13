# Weather API

This repository contains an ASP.NET Core 8.0 Web API project named **OpenWeatherApi**. The service is scaffolded with Swagger/OpenAPI support for interactive exploration of the endpoints.

## Getting started

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

## Project structure

- `Program.cs` configures services and middleware including Swagger.
- `Controllers/WeatherForecastController.cs` exposes a sample weather endpoint.
- `WeatherForecast.cs` defines the response model returned by the sample endpoint.
- `appsettings*.json` contain configuration for logging and hosting.

The project template follows the defaults provided by `dotnet new webapi` targeting .NET 8.0.
