# =============================
# 1. Runtime Image
# =============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# =============================
# 2. Build Image
# =============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy backend folder only
COPY . .

# If your csproj is inside /backend:
RUN dotnet restore ./OpenWeatherApi/OpenWeatherApi.csproj
RUN dotnet publish ./OpenWeatherApi/OpenWeatherApi.csproj -c Release -o /app/publish

# =============================
# 3. Final Image
# =============================
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "OpenWeatherApi.dll"]
