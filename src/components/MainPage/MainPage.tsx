import { useState } from 'react';
import type { cityFetch } from '../utills/City';
import { CustomButton } from '../Elements/button';
import { searchCity, searchCityByCords } from './geoApi';
import { getCurrentCoords } from './geolocation';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const [city, setCity] = useState(
    () => localStorage.getItem('cityInput') || '',
  );
  const [error, setError] = useState('');
  const [jsonCity, setJsonCity] = useState<cityFetch[] | null>(null);
  const cityRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s-'’`]+$/;
  const navigate = useNavigate();

  const handleSelectCity = (cityName: string, lat: string, lon: string) => {
    navigate(
      `/weather?city=${encodeURIComponent(cityName)}&lat=${lat}&lon=${lon}`,
    );
  };

  const handleLocate = async () => {
    setError('');
    try {
      const coords = await getCurrentCoords();
      const data = await searchCityByCords(coords.latitude, coords.longitude);
      setJsonCity([data]);
    } catch (err: any) {
      setError(err.message || 'Не знайдено населений пункт по координатах');
    }
  };

  const handleSearchCityByInput = async () => {
    setError('');
    setJsonCity(null);

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError('Введіть назву міста');
      return;
    }

    if (!cityRegex.test(trimmedCity)) {
      setError('Назва міста містить неприпустимі символи');
      setJsonCity([]);
      return;
    }

    localStorage.setItem('cityInput', trimmedCity);

    try {
      const filteredCities = await searchCity(trimmedCity);
      if (filteredCities.length === 0) {
        setError('Населений пункт не знайдено');
        setJsonCity([]);
      } else {
        setJsonCity(filteredCities);
      }
    } catch (err) {
      setError('Не вдалося завантажити дані');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full p-4 sm:p-6">
      {/* Заголовок сторінки */}
      <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
        <h1
          className="text-2xl sm:text-4xl font-extrabold text-slate-900
            tracking-tight"
        >
          Дізнайся прогноз погоди
        </h1>
        <span className="text-xs sm:text-sm text-slate-500 font-medium">
          Пошук за назвою або вашою геолокацією
        </span>
      </div>

      {/* Форма пошуку */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div
          className="flex-1 p-6 rounded-3xl bg-linear-to-br from-blue-600
            to-indigo-700 shadow-xl shadow-blue-500/10 border border-blue-400/20
            flex flex-col justify-center gap-3"
        >
          <label
            htmlFor="city-input"
            className="text-sm font-semibold text-blue-100 uppercase
              tracking-wider"
          >
            Введіть місто:
          </label>

          <input
            id="city-input"
            type="text"
            value={city}
            placeholder="Наприклад: Київ"
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchCityByInput()}
            className="w-full px-4 py-3 rounded-xl border border-white/20
              bg-white/10 text-white placeholder-blue-200/60 outline-none
              backdrop-blur-md transition-all duration-200 focus:bg-white
              focus:text-slate-800 focus:placeholder-slate-400 focus:ring-4
              focus:ring-white/30"
          />
        </div>

        <div
          className="flex flex-col justify-center gap-3 sm:flex-row md:flex-col
            min-w-50"
        >
          <CustomButton onClick={handleSearchCityByInput}>
            Знайти місто
          </CustomButton>

          <CustomButton onClick={handleLocate}>📍 Моя геолокація</CustomButton>
        </div>
      </div>

      {error && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-2xl
            text-red-600 text-sm font-medium animate-fade-in"
        >
          ⚠️ {error}
        </div>
      )}

      {jsonCity && jsonCity.length > 0 && (
        <div
          className="flex flex-col gap-3 p-6 rounded-3xl bg-linear-to-br
            from-blue-600 to-indigo-700 text-white shadow-xl"
        >
          <h3
            className="text-sm font-semibold text-slate-100 uppercase
              tracking-wider mb-1"
          >
            Знайдені населені пункти ({jsonCity.length}):
          </h3>

          <div className="flex flex-col gap-2">
            {jsonCity.map((el, index) => (
              <div
                key={el.place_id || index}
                onClick={() => handleSelectCity(el.name, el.lat, el.lon)}
                className="p-4 rounded-xl bg-linear-to-br from-blue-700
                  to-indigo-800 border hover:bg-blue-600 hover:border-blue-500
                  transition-all duration-200 cursor-pointer flex flex-col
                  sm:flex-row sm:items-center justify-between gap-2 group"
              >
                <div className="flex flex-col">
                  <span
                    className="text-base font-semibold text-white
                      group-hover:text-white"
                  >
                    {el.display_name}
                  </span>
                  <span
                    className="text-xs text-slate-400 group-hover:text-blue-100"
                  >
                    Тип: {el.type}
                  </span>
                </div>

                <span
                  className="text-xs font-mono bg-blue-600 border
                    group-hover:bg-blue-700 text-slate-300
                    group-hover:text-white px-3 py-1 rounded-lg self-start
                    sm:self-center min-w-fit"
                >
                  {Number(el.lat).toFixed(2)}, {Number(el.lon).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
