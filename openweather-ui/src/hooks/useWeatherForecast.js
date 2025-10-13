import { useEffect, useMemo, useState } from 'react';
import { get } from '../utils/apiClient.js';

function parseForecast(data = []) {
  return data.map((item) => ({
    date: item.date,
    summary: item.summary,
    temperatureC: item.temperatureC,
    temperatureF: item.temperatureF
  }));
}

export default function useWeatherForecast() {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    get('/weatherforecast')
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
  }, []);

  const metrics = useMemo(() => {
    if (!forecast.length) {
      return {
        averageC: 0,
        highestC: 0,
        lowestC: 0
      };
    }

    const temps = forecast.map((item) => item.temperatureC);
    const sum = temps.reduce((acc, value) => acc + value, 0);

    return {
      averageC: Math.round((sum / temps.length) * 10) / 10,
      highestC: Math.max(...temps),
      lowestC: Math.min(...temps)
    };
  }, [forecast]);

  return {
    forecast,
    metrics,
    isLoading,
    error
  };
}
