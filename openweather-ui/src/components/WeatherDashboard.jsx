import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography
} from '@mui/material';

const forecastItemPropType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  summary: PropTypes.string,
  temperatureC: PropTypes.number.isRequired,
  temperatureF: PropTypes.number.isRequired,
  icon: PropTypes.string // 新增 icon 欄位
});


function ForecastRow({ item }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 150px 150px',
        alignItems: 'center',
        py: 2,
        px: 3
      }}
    >
      <Typography variant="subtitle1">{new Date(item.date).toLocaleDateString()}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {item.icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
            alt="weather icon"
            style={{ width: 40, height: 40 }}
          />
        ) : null}
      </Box>
      <Typography variant="body1">{item.temperatureC}°C / {item.temperatureF}°F</Typography>
      <Typography variant="body2" color="text.secondary">
        {item.summary}
      </Typography>
    </Box>
  );
}

ForecastRow.propTypes = {
  item: forecastItemPropType.isRequired
};

function CurrentWeatherCard({ selectedCity, currentWeather, isLoadingCurrent, errorCurrent }) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" gutterBottom>
          當前天氣 - {selectedCity}
        </Typography>
        {isLoadingCurrent ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary">
              正在更新 {selectedCity} 的天氣資料...
            </Typography>
          </Box>
        ) : errorCurrent ? (
          <Typography variant="body2" color="error">
            {errorCurrent}
          </Typography>
        ) : currentWeather ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {currentWeather.icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                alt="weather icon"
                style={{ width: 72, height: 72 }}
              />
            ) : null}
            <Box>
              <Typography variant="h3" component="div">
                {currentWeather.temperatureC}°C / {currentWeather.temperatureF}°F
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {currentWeather.summary}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                更新時間：{currentWeather.date}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 1 }}>
                {typeof currentWeather.cloudiness === 'number' && (
                  <Typography variant="body2" color="text.secondary">
                    雲量：{currentWeather.cloudiness}%
                  </Typography>
                )}
                {typeof currentWeather.uvIndex === 'number' && (
                  <Typography variant="body2" color="text.secondary">
                    紫外線指數：{currentWeather.uvIndex}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            尚未取得 {selectedCity} 的天氣資料。
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

CurrentWeatherCard.propTypes = {
  selectedCity: PropTypes.string.isRequired,
  currentWeather: PropTypes.shape({
    date: PropTypes.string,
    summary: PropTypes.string,
    temperatureC: PropTypes.number,
    temperatureF: PropTypes.number,
    icon: PropTypes.string,
    cloudiness: PropTypes.number,
    uvIndex: PropTypes.number
  }),
  isLoadingCurrent: PropTypes.bool.isRequired,
  errorCurrent: PropTypes.string
};

CurrentWeatherCard.defaultProps = {
  currentWeather: null,
  errorCurrent: null
};

export default function WeatherDashboard({
  forecast,
  isLoading,
  error,
  selectedCity,
  currentWeather,
  isLoadingCurrent,
  errorCurrent
}) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 3 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <CurrentWeatherCard
        selectedCity={selectedCity}
        currentWeather={currentWeather}
        isLoadingCurrent={isLoadingCurrent}
        errorCurrent={errorCurrent}
      />

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            未來五日天氣預報
          </Typography>
          <Typography variant="body2" color="text.secondary">
            從 OpenWeatherApi 取得的樣本資料。
          </Typography>
        </Box>
        <Divider />
        <Box>
          {forecast.length === 0 ? (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary">
                尚未取得天氣資料，請確認後端 API 是否已啟動。
              </Typography>
            </Box>
          ) : (
            forecast.map((item, index) => (
              <Box key={item.date}>
                <ForecastRow item={item} />
                {index < forecast.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </Box>
      </Card>
    </Box>
  );
}

WeatherDashboard.propTypes = {
  forecast: PropTypes.arrayOf(forecastItemPropType).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  selectedCity: PropTypes.string,
  currentWeather: CurrentWeatherCard.propTypes.currentWeather,
  isLoadingCurrent: PropTypes.bool,
  errorCurrent: PropTypes.string
};

WeatherDashboard.defaultProps = {
  error: null,
  selectedCity: '',
  currentWeather: CurrentWeatherCard.defaultProps.currentWeather,
  isLoadingCurrent: false,
  errorCurrent: CurrentWeatherCard.defaultProps.errorCurrent
};
