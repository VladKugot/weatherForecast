import { useState } from 'react';
import type { cityFetch } from '../utills/City';
import { CustomButton } from '../Elements/button';
import { searchCity, searchCityByCords } from './geoApi';
import { getCurrentCoords } from './geolocation';
import { useNavigate } from 'react-router-dom';

interface Coordinates {
  lat: number;
  lon: number;
}

export const MainPage = () => {
  const [city, setCity] = useState(
    () => localStorage.getItem('cityInput') || '',
  );
  const [error, setError] = useState('');
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [jsonCity, setJsonCity] = useState<cityFetch[] | null>();
  const cityRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s-'’`]+$/;
  const navigate = useNavigate();

  const handleSelectCity = (cityName: string, lat: string, lon: string) => {
  navigate(`/weather?city=${encodeURIComponent(cityName)}&lat=${lat}&lon=${lon}`);
};

  const handleLocate = async () => {
    setError('');
    try {
      const coords = await getCurrentCoords();
      setCoords({ lat: coords.latitude, lon: coords.longitude });
      const data = await searchCityByCords(coords.latitude, coords.longitude);
      setJsonCity([data]);
    } catch (err: any) {
      setError(err.message || 'Не знайдено населений пункт по координатах');
    }
  };

  const handleSearchCityByInput = async () => {
    setError('');
    setJsonCity(null);
    if (city) {
      localStorage.setItem('cityInput', city);
      if (!cityRegex.test(city)) {
        setError('Містить символи');
        setJsonCity([]);
      } else {
        try {
          const filteredCities = searchCity(city);
          if ((await filteredCities).length === 0) {
            setError('Населений пункт не знайдено');
            setJsonCity([]);
          } else {
            setJsonCity(await filteredCities);
          }
        } catch (err) {
          setError('Не знайдено');
        }
      }
    } else {
      setError('Поле пусте');
    }
  };

  return (
    <div
      className="flex flex-col gap-6 mx-auto p-6 bg-white/80 backdrop-blur-md
        rounded-2xl shadow-md border border-slate-100 w-full"
    >
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
        Дізнайся прогноз погоди
      </h1>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-10 sm:flex-row sm:items-center">
            <label
              htmlFor="city-input"
              className="text-base font-medium text-slate-600"
            >
              Оберіть місто:
            </label>

            <input
              id="city-input"
              type="text"
              placeholder= {city || "Наприклад: Київ"}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-amber-300
                bg-white text-slate-800 placeholder-slate-400 outline-none
                transition-all duration-200 hover:border-amber-400
                focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
            />
          </div>

          <CustomButton onClick={() => handleSearchCityByInput()}>
            Знайти місто
          </CustomButton>
        </div>
        <div className="">
          <CustomButton onClick={() => handleLocate()}>
            Дізнатися геолокацію
          </CustomButton>

          {coords && (
            <div>
              {coords.lat} {coords.lon}
              {}
            </div>
          )}
        </div>
      </div>
      {error && <div className="div">{error}</div>}
      {jsonCity && (
        <div
          className="flex flex-col gap-2 bg-blue-100 p-8 rounded-2xl
            inset-shadow-amber-50 shadow-md"
        >
          {jsonCity && jsonCity.length > 0 && (
            <div className="flex flex-col gap-2">
              {jsonCity.map((el, index) => {
                const isMultiple = jsonCity.length > 1;

                return (
                  <div
                    key={el.place_id || index}
                    className={`text-blue-600 text-xl transition-transform
                    duration-400 hover:scale-102 hover:text-blue-400
                    cursor-pointer ${
                      isMultiple ? 'p-4 border rounded-xl bg-white' : ''
                    }`}
                    onClick={() => handleSelectCity(el.name, el.lat, el.lon)}
                  >
                    {el.display_name} - {el.name} {el.lat}, {el.lon}
                    {isMultiple && `, ${el.type}`}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
