import { useEffect, useState } from 'react';
import { get } from '../utils/apiClient.js';

function parseForecast(data = []) {
  return data.map((item) => ({
    date: item.date,
    summary: item.summary,
    temperatureC: item.temperatureC,
    temperatureF: item.temperatureF,
    icon: item.icon
  }));
}

export default function useWeatherForecast(city) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    get(`/WeatherForecast/forecast/${encodeURIComponent(city)}`)
      .then((data) => {
        if (isMounted) {
          setForecast(parseForecast(data));
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [city]);

  return {
    forecast,
    isLoading,
    error
  };
}
