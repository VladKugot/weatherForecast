import { useEffect, useState } from 'react';
import type { WeatherResponse } from '../utills/Weather';
import { useSearchParams } from 'react-router-dom';
import { weatherApi } from './weatherApi';

export const WeatherPage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [weatherFetch, setWeatherFetch] = useState<WeatherResponse>();
  const cityName = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  useEffect(() => {
    if (!lat || !lon) {
      setError('Координати не вказані в посиланні');
      return;
    }

    const fetchWeatherData = async () => {
      setError('');

      try {
        setWeatherFetch(await weatherApi(lat, lon));
      } catch (err) {
        setError('Прогноз не знайдено');
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return (
    <section className="">
      <h1>Weaher Page</h1>
      {cityName} {lat} {lon}
      <p>{error}</p>

      <div className="">
        <h1>Погода у {cityName} зараз</h1>
        <p>Останнє оновлення: {weatherFetch?.current_weather.time}</p>
        <div className="">
          <p>Температура: {weatherFetch?.current_weather.temperature}</p>
          <p>Швидкість вітру: {weatherFetch?.current_weather.windspeed}</p>
          <p>Напрямок вітру: {weatherFetch?.current_weather.winddirection}</p>
        </div>
      </div>
    </section>
  );
};
