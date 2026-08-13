import { useEffect, useState } from 'react';
import type { WeatherResponse } from '../utills/Weather';
import { useSearchParams } from 'react-router-dom';
import { weatherApi } from './weatherApi';
import { CustomButton } from '../Elements/button';

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
    <section className="flex flex-col gap-8 max-w-4xl mx-auto w-full p-4 sm:p-6">
      {weatherFetch && (
        <>
          <div className="flex flex-col gap-2">
            <h1
              className="text-2xl sm:text-4xl font-bold text-slate-900
                tracking-tight"
            >
              Погода у <span className="text-blue-600">{cityName}</span> зараз
            </h1>
            <div
              className="flex justify-between items-center border-b
                border-blue-300 pb-2"
            >
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                Поточні метеодані
              </span>
              <p
                className="text-xs sm:text-sm text-blue-700 font-semibold
                  bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
              >
                Останнє оновлення:{' '}
                {weatherFetch?.current_weather.time.split('T')[1]}
              </p>
            </div>
          </div>

          <div
            className="relative overflow-hidden bg-linear-to-br from-blue-600
              to-indigo-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl
              shadow-blue-500/10 border border-blue-400/20"
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center
                justify-between gap-6 relative z-10"
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-6xl sm:text-7xl font-extrabold
                    tracking-tighter"
                >
                  {Math.round(weatherFetch.current_weather.temperature)}°
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-blue-100">
                    Цельсія
                  </span>
                  <span className="text-xs text-blue-200">Зараз у місті</span>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-3 sm:gap-4 bg-white/10
                  backdrop-blur-md p-4 rounded-2xl border border-white/10"
              >
                <div className="flex flex-col">
                  <span
                    className="text-xs text-blue-200 uppercase font-bold
                      tracking-wider"
                  >
                    Швидкість вітру
                  </span>
                  <span className="text-lg sm:text-xl font-semibold mt-1">
                    {weatherFetch.current_weather.windspeed}{' '}
                    <span className="text-sm font-normal text-blue-200">
                      км/год
                    </span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span
                    className="text-xs text-blue-200 uppercase font-bold
                      tracking-wider"
                  >
                    Напрямок вітру
                  </span>
                  <span className="text-lg sm:text-xl font-semibold mt-1">
                    {weatherFetch.current_weather.winddirection}°
                    <svg
                      className="w-6 h-6 text-blue-200 transition-transform
                        duration-500 ease-out"
                      style={{ transform: `rotate(${weatherFetch.current_weather.winddirection}deg)` }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-5.25 5.25M12 4.5l5.25 5.25"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4
              pt-2"
          >
            <CustomButton>Прогноз на день</CustomButton>
            <CustomButton>Прогноз на 3 дні</CustomButton>
            <CustomButton>Прогноз на тиждень</CustomButton>
          </div>
        </>
      )}

      {error && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-2xl
            text-red-600 text-center font-medium"
        >
          {error}
        </div>
      )}
    </section>
  );
};
