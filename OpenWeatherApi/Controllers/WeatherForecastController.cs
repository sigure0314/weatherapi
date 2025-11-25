using Microsoft.AspNetCore.Mvc;

namespace OpenWeatherApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly Services.OpenWeatherService _openWeatherService;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, Services.OpenWeatherService openWeatherService)
    {
        _logger = logger;
        _openWeatherService = openWeatherService;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

    // 新增：串接 openweathermap.org 查詢指定城市天氣
    [HttpGet("current/{city}")]
    public async Task<IActionResult> GetCurrentWeather(string city)
    {
        var weather = await _openWeatherService.GetCurrentWeatherAsync(city);
        if (weather == null)
            return NotFound();
        return Ok(weather);
    }

    [HttpGet("forecast/{city}")]
    public async Task<IActionResult> GetForecast(string city)
    {
        var forecast = await _openWeatherService.GetFiveDayForecastAsync(city);
        if (forecast == null)
        {
            return NotFound();
        }

        return Ok(forecast);
    }
}
