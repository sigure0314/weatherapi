# OpenWeather UI

This project is a React single-page application styled with the Berry Admin template. It consumes the `WeatherForecast` endpoint exposed by the ASP.NET Core backend located in `../OpenWeatherApi`.

## Available scripts

After installing dependencies with `npm install`, the following scripts are available:

- `npm run dev` – starts the Vite development server on <http://localhost:5173>.
- `npm run build` – builds the production bundle.
- `npm run preview` – serves the production build locally for verification.
- `npm run lint` – runs ESLint using the provided React configuration.

## Environment variables

The app reads a `VITE_API_BASE_URL` variable to determine the backend API to use. Copy `.env.example` to `.env` and adjust as needed.
