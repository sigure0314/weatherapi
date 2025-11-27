import { useCallback, useEffect, useState } from 'react';
import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import WeatherDashboard from '../components/WeatherDashboard.jsx';
import useWeatherForecast from '../hooks/useWeatherForecast.js';
import cities from '../constants/cities.js';
import { get } from '../utils/apiClient.js';

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState(cities[0].value);
  const { forecast, isLoading, error } = useWeatherForecast(selectedCity);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false);
  const [errorCurrent, setErrorCurrent] = useState(null);

  const handleCityChange = useCallback((e) => {
    setSelectedCity(e.target.value);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentWeather = async () => {
      try {
        setIsLoadingCurrent(true);
        setErrorCurrent(null);
        const data = await get(`/WeatherForecast/current/${encodeURIComponent(selectedCity)}`);
        if (isMounted) {
          setCurrentWeather(data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorCurrent(err?.message || 'Load current weather failed');
        }
      } finally {
        if (isMounted) {
          setIsLoadingCurrent(false);
        }
      }
    };

    fetchCurrentWeather();

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h2" gutterBottom>
          歡迎使用 OpenWeather 儀表板
        </Typography>
        <Typography variant="body1" color="text.secondary">
          此儀表板使用 Berry Admin 風格設計，並串接後端 ASP.NET Core OpenWeatherApi 的範例資料。
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="city-select-label">選擇城市</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            label="選擇城市"
            onChange={handleCityChange}
          >
            {cities.map(city => (
              <MenuItem key={city.value} value={city.value}>{city.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <WeatherDashboard
        forecast={forecast}
        isLoading={isLoading}
        error={error}
        selectedCity={selectedCity}
        currentWeather={currentWeather}
        isLoadingCurrent={isLoadingCurrent}
        errorCurrent={errorCurrent}
      />
    </Container>
  );
}
