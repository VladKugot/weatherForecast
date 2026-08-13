// Описи одиниць вимірювання
export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: string;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weathercode: string;
}

// Поточна погода
export interface CurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number; // 1 - день, 0 - ніч
  weathercode: number;
}

// Прогноз по годинах (паралельні масиви)
export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

// Головний інтерфейс відповіді API
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: HourlyForecast;
}