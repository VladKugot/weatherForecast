import { useEffect, useState } from 'react';

export const MainPage = () => {
  const [city, setCity] = useState('');
  const [goodCity, setGoodCity] = useState('');
  const [error, setError] = useState('');
  const cityRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s-]+$/;

  const handleSearch = async () => {
    setError('');
    if (city) {
      if (!cityRegex.test(city)) {
        setError('Містить символи');
        setGoodCity('');
      } else {
        setGoodCity(city);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${goodCity}&format=json`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
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
        rounded-2xl shadow-md border border-slate-100"
    >
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
        Дізнайся прогноз погоди
      </h1>

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
          placeholder="Наприклад: Київ"
          onChange={(e) => setCity(e.target.value)}
          className="w-100 px-4 py-2 rounded-xl border-2 border-amber-300
            bg-white text-slate-800 placeholder-slate-400 outline-none
            transition-all duration-200 hover:border-amber-400
            focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
        />
      </div>

      <button
        onClick={() => handleSearch()}
        className="cursor-pointer p-2 m-auto border text-blue-50 text-x
          border-blue-700 bg-blue-700 w-fit"
      >
        Знайти місто
      </button>
      {error && <div className="div">{error}</div>}
      {goodCity && <div className="div">{goodCity}</div>}
    </div>
  );
};
