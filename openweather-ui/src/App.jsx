import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import MainLayout from './layouts/MainLayout.jsx';
import theme from './theme/index.js';
import WeatherDashboard from './components/WeatherDashboard.jsx';
import useWeatherForecast from './hooks/useWeatherForecast.js';

export default function App() {
  const { forecast, metrics, isLoading, error } = useWeatherForecast();

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="h2" gutterBottom>
              歡迎使用 OpenWeather 儀表板
            </Typography>
            <Typography variant="body1" color="text.secondary">
              此儀表板使用 Berry Admin 風格設計，並串接後端 ASP.NET Core OpenWeatherApi 的範例資料。
            </Typography>
          </Box>
          <WeatherDashboard forecast={forecast} metrics={metrics} isLoading={isLoading} error={error} />
        </Container>
      </MainLayout>
    </ThemeProvider>
  );
}
