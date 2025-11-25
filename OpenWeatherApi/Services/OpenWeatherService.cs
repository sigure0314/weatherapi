using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace OpenWeatherApi.Services
{
    public class OpenWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public OpenWeatherService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["OpenWeather:ApiKey"] ?? string.Empty;
        }

        public async Task<object?> GetCurrentWeatherAsync(string city)
        {
            var url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric&lang=zh_tw";
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                return null;
            var json = await response.Content.ReadAsStringAsync();
            // 解析 JSON，僅取需要欄位
            using var doc = System.Text.Json.JsonDocument.Parse(json);
            var root = doc.RootElement;
            var main = root.GetProperty("main");
            var weatherArr = root.GetProperty("weather");
            var weather = weatherArr[0];
            var dt = root.GetProperty("dt").GetInt64();
            var date = DateTimeOffset.FromUnixTimeSeconds(dt).DateTime;
            return new
            {
                date = date.ToString("yyyy-MM-dd"),
                temperatureC = main.GetProperty("temp").GetDouble(),
                temperatureF = Math.Round(main.GetProperty("temp").GetDouble() * 9 / 5 + 32, 1),
                summary = weather.GetProperty("description").GetString(),
                icon = weather.GetProperty("icon").GetString()
            };
        }

        public async Task<IEnumerable<object>?> GetFiveDayForecastAsync(string city)
        {
            var url = $"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={_apiKey}&units=metric&lang=zh_tw";
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();

            using var doc = System.Text.Json.JsonDocument.Parse(json);
            var list = doc.RootElement.GetProperty("list");
            var forecasts = new List<object>();
            foreach (var item in list.EnumerateArray().Take(5))
            {
                var main = item.GetProperty("main");
                var weatherArr = item.GetProperty("weather");
                var weather = weatherArr[0];
                var dt = item.GetProperty("dt").GetInt64();
                var date = DateTimeOffset.FromUnixTimeSeconds(dt).DateTime;

                var tempC = main.GetProperty("temp").GetDouble();
                forecasts.Add(new
                {
                    date = date.ToString("yyyy-MM-dd"),
                    temperatureC = tempC,
                    temperatureF = Math.Round(tempC * 9 / 5 + 32, 1),
                    summary = weather.GetProperty("description").GetString(),
                    icon = weather.GetProperty("icon").GetString()
                });
            }

            return forecasts;
        }
    }
}
