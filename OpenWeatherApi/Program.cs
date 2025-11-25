var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// 註冊 OpenWeatherService 與 HttpClient
builder.Services.AddHttpClient<OpenWeatherApi.Services.OpenWeatherService>();
var origins = new[] { "https://weatherapi-9rdx4m8om-sigurelees-projects.vercel.app","https://silver-capybara-wxjw6j7vjvj25j4p-5173.app.github.dev", "http://localhost:5173" /* Vite dev */ };
builder.Services.AddCors(p => p.AddPolicy("AllowFrontend", policy =>
{
    policy.WithOrigins(origins)
          .AllowAnyHeader()
          .AllowAnyMethod()
          // 若需要帶 Cookie/憑證，兩端都要設定：
          .AllowCredentials();
}));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();

app.Run();
